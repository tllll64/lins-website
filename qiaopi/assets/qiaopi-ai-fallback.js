/**
 * 侨批「AI 代笔」网络兜底
 * ------------------------------------------------------------------
 * 线上代理 https://qiaopi-ai-proxy.vercel.app/api/ai/rewrite 部署在 Vercel，
 * 国内网络访问 *.vercel.app 时常被阻断（连接重置 / SYN 丢弃），页面要干等
 * 20 秒才报「AI 代笔超时」；换到能连通的网络时，代理本身也可能要 12~19 秒。
 *
 * 这个脚本在页面加载前接管 fetch，只处理 AI 代笔接口：
 *   1. 正常发起请求，同时用 3.5 秒探一下代理域名是否可达；
 *   2. 域名不可达 → 立刻用本地「代笔先生」模板成稿，不再干等；
 *   3. 域名可达但 AI 慢 → 继续等（页面脚本的超时已放宽到 28 秒），
 *      第 9 秒提示「网络较慢」，第 10 秒给一个「改用本地代笔」按钮；
 *   4. 请求失败 / 超时 / 返回异常 → 同样用本地代笔成稿；
 *   5. 两种路径都会弹一条轻提示，明确告知是本地代笔，不冒充 AI。
 *
 * 本地成稿返回与代理一致的 { code:0, data:{ content } }，页面照常进入结果页。
 * 等以后接上国内可达的代理（如 https://api.lynntian.com/api/ai/rewrite），
 * 删掉 index.html 里的这行 <script> 即可恢复纯 AI 链路。
 */
(function () {
  'use strict';

  var ENDPOINT_KEY = '/api/ai/rewrite';
  var VERCEL_HOST = 'qiaopi-ai-proxy.vercel.app';
  var PROBE_URL = 'https://' + VERCEL_HOST + '/';
  var PROBE_TIMEOUT_MS = 3500;
  var REQUEST_CEILING_MS = 29000; // 页面脚本 28 秒超时，这里只做最后兜底
  var SLOW_HINT_MS = 9000;
  var MAX_CHARS = 110;

  var nativeFetch = window.fetch && window.fetch.bind(window);
  if (!nativeFetch) return;

  /* ============ 文案素材 ============ */

  // 开场：同一标签给两种，按输入做一个稳定散列，避免千人一面
  var OPENINGS = {
    思念父母: ['见字如面。', '展信如晤。'],
    挂念妻儿: ['灯下提笔，心中甚是挂念。', '夜里得闲，提笔与你说几句话。'],
    思乡牵挂: ['客中夜静，常忆故里灯火。', '离乡日久，总念着家中光景。'],
    操劳问候: ['闻你近来操劳，心中记挂。', '知你一向辛苦，我心里放不下。'],
    祈福祝愿: ['遥寄数语，惟愿家中安好。', '提笔无他，只盼一家顺遂。'],
    叮咛嘱咐: ['天时多变，望你多加保重。', '在外诸事，总要自己当心。']
  };
  var DEFAULT_OPENING = '见字如面。';

  // 只选标签、没写大白话时，用这一句作正文（不编造具体事件）
  var TAG_BODIES = {
    思念父母: '离乡日久，常念家中诸事。',
    挂念妻儿: '一别多日，家中大小都念着。',
    思乡牵挂: '久客他乡，乡音入梦，只盼家中一切如常。',
    操劳问候: '你一向操劳，还望少些辛苦。',
    祈福祝愿: '惟愿岁岁平安，诸事顺遂。',
    叮咛嘱咐: '早晚添衣，饮食当心。'
  };

  // 收尾：按标签给一句，语气收敛，不添加归期、寄钱等事实
  var CLOSINGS = {
    思念父母: '惟愿身体康健，勿以我为念。',
    挂念妻儿: '惟愿家中安好，余言不尽。',
    思乡牵挂: '纸短情长，惟祈珍重。',
    操劳问候: '万望少劳些，保重身子。',
    祈福祝愿: '愿家中和顺，福气绵长。',
    叮咛嘱咐: '切记添衣，勿使我挂念。'
  };
  var DEFAULT_CLOSING = '余言不尽，惟祈珍重。';

  // 大白话 → 半文言的轻量替换（只动虚词与常见口语，保留原意）
  var POLISH = [
    ['非常', '十分'],
    ['特别', '格外'],
    ['真的', '实在'],
    ['好想', '甚是念'],
    ['很想', '甚念'],
    ['想你', '念你'],
    ['想念', '挂念'],
    ['想', '念'],
    ['但是', '只是'],
    ['可是', '只是'],
    ['因为', '只因'],
    ['所以', '故而'],
    ['现在', '如今'],
    ['最近', '近来'],
    ['身体', '身子'],
    ['谢谢', '多谢'],
    ['吗', '么'],
    ['！', '。'],
    ['!', '。']
  ];

  /* ============ 小工具 ============ */

  function chars(text) {
    return Array.from(text);
  }

  function pick(list, seed) {
    if (!list || !list.length) return '';
    var h = 0;
    for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return list[h % list.length];
  }

  function stripEdges(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .replace(/^[\s，,。.、；;：:！!？?“”"'‘’…—-]+/, '')
      .replace(/[\s，,、；;：:]+$/, '')
      .trim();
  }

  function trimTo(text, max) {
    var arr = chars(text);
    if (arr.length <= max) return text;
    var cut = arr.slice(0, max).join('');
    for (var i = cut.length - 1; i >= Math.floor(max * 0.55); i--) {
      if ('。！？；，、'.indexOf(cut[i]) !== -1) return cut.slice(0, i + 1);
    }
    return cut;
  }

  function polish(text) {
    var out = text;
    for (var i = 0; i < POLISH.length; i++) {
      out = out.split(POLISH[i][0]).join(POLISH[i][1]);
    }
    // 「念念」之类叠字收拾一下
    out = out.replace(/念念/g, '念').replace(/么么/g, '么');
    return stripEdges(out);
  }

  // 去掉大白话开头重复的称呼（信纸已单独画「阿嬷 亲启」）
  function stripSalutation(text, recipient) {
    if (!recipient || text.indexOf(recipient) !== 0) return text;
    var rest = text.slice(recipient.length);
    if (!rest) return '';
    return stripEdges(rest);
  }

  function isTagOnly(text, tags) {
    if (!text) return true;
    var compact = text.replace(/[\s，,、；;]/g, '');
    if (!compact) return true;
    if (!tags.length) return false;
    var rebuilt = tags.join('').replace(/[\s，,、；;]/g, '');
    return compact === rebuilt;
  }

  /* ============ 本地代笔 ============ */

  function composeLetter(payload) {
    var recipient = String((payload && payload.recipient) || '').trim();
    var tags = Array.isArray(payload && payload.tags)
      ? payload.tags.map(function (t) { return String(t).trim(); }).filter(Boolean)
      : [];
    var raw = String((payload && payload.message) || '').trim();
    var seed = recipient + '|' + tags.join(',') + '|' + raw;

    var opening = OPENINGS[tags[0]] ? pick(OPENINGS[tags[0]], seed) : DEFAULT_OPENING;

    var body = '';
    if (!isTagOnly(raw, tags)) {
      body = stripSalutation(raw, recipient);
      body = polish(body);
    }
    if (!body) {
      var tagBody = tags.length ? TAG_BODIES[tags[0]] : '';
      body = tagBody || '别来无恙，惟愿家中一切安好。';
    }
    if (!/[。！？]$/.test(body)) body += '。';

    var closing = CLOSINGS[tags[0]] ? CLOSINGS[tags[0]] : DEFAULT_CLOSING;
    // 正文里已经带了同样的收尾就不再重复
    if (body.indexOf(closing) !== -1) closing = '';

    // 正文 + 收尾超长时，先压正文，保住收尾
    var head = opening + body;
    var budget = MAX_CHARS - chars(closing).length;
    if (chars(head).length > budget) {
      head = trimTo(head, budget);
      if (!/[。！？]$/.test(head)) head = head.replace(/[，,、；;：:]$/, '') + '。';
    }
    return head + closing;
  }

  /* ============ 轻提示 ============ */

  var toastTimer = null;
  function showToast(message) {
    try {
      var old = document.querySelector('.qiaopi-ai-toast');
      if (old) old.remove();
      if (toastTimer) clearTimeout(toastTimer);

      var el = document.createElement('div');
      el.className = 'qiaopi-ai-toast';
      el.textContent = message;
      el.setAttribute('role', 'status');
      el.style.cssText = [
        'position:fixed',
        'left:50%',
        'bottom:12%',
        'transform:translateX(-50%)',
        'max-width:80vw',
        'padding:10px 18px',
        'border-radius:999px',
        'background:rgba(24,20,16,.82)',
        'color:#F3EDE0',
        'font:400 14px/1.5 "Noto Serif SC","Songti SC",serif',
        'letter-spacing:.04em',
        'text-align:center',
        'z-index:9999',
        'pointer-events:none',
        'opacity:0',
        'transition:opacity .3s ease',
        '-webkit-backdrop-filter:blur(4px)',
        'backdrop-filter:blur(4px)'
      ].join(';');
      document.body.appendChild(el);
      requestAnimationFrame(function () { el.style.opacity = '1'; });
      toastTimer = setTimeout(function () {
        el.style.opacity = '0';
        setTimeout(function () { el.remove(); }, 320);
      }, 3600);
    } catch (e) {
      /* 提示失败不影响成稿 */
    }
  }

  /* ============ 慢请求提示 + 本地成稿按钮 ============ */

  var hintEl = null;
  function showSlowHint(onLocal) {
    if (hintEl) return hintEl;
    try {
      hintEl = document.createElement('div');
      hintEl.className = 'qiaopi-slow-hint';
      hintEl.style.cssText = [
        'position:fixed',
        'left:50%',
        'bottom:7%',
        'transform:translateX(-50%)',
        'z-index:9999',
        'max-width:86vw',
        'padding:9px 16px',
        'border-radius:999px',
        'background:rgba(24,20,16,.72)',
        'color:#F3EDE0',
        'font:400 13px/1.5 "Noto Serif SC","Songti SC",serif',
        'letter-spacing:.04em',
        'text-align:center',
        'opacity:0',
        'transition:opacity .3s ease',
        '-webkit-backdrop-filter:blur(4px)',
        'backdrop-filter:blur(4px)'
      ].join(';');
      hintEl.textContent = '网络较慢，仍在书写…';
      document.body.appendChild(hintEl);
      requestAnimationFrame(function () { hintEl.style.opacity = '1'; });

      setTimeout(function () {
        if (!hintEl || !hintEl.parentNode) return;
        hintEl.textContent = '';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = '等太久？改用本地代笔';
        btn.style.cssText = [
          'border:0',
          'background:transparent',
          'color:#F3EDE0',
          'font:400 13px/1.5 "Noto Serif SC","Songti SC",serif',
          'letter-spacing:.04em',
          'cursor:pointer',
          'padding:0',
          'text-decoration:underline',
          'text-underline-offset:3px'
        ].join(';');
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          onLocal();
        });
        hintEl.appendChild(btn);
      }, 1000);
    } catch (e) {
      hintEl = null;
    }
  }

  function hideSlowHint() {
    if (!hintEl) return;
    var el = hintEl;
    hintEl = null;
    try { el.remove(); } catch (e) { /* ignore */ }
  }

  /* ============ 探活 ============ */

  var probeResult = null;
  function probeHost() {
    if (probeResult !== null) return Promise.resolve(probeResult);
    return new Promise(function (resolve) {
      var done = false;
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        if (ctrl) ctrl.abort();
        probeResult = false;
        resolve(false);
      }, PROBE_TIMEOUT_MS);

      nativeFetch(PROBE_URL, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
        signal: ctrl ? ctrl.signal : undefined
      }).then(function () {
        if (done) return;
        done = true;
        clearTimeout(timer);
        probeResult = true;
        resolve(true);
      }).catch(function () {
        if (done) return;
        done = true;
        clearTimeout(timer);
        probeResult = false;
        resolve(false);
      });
    });
  }

  /* ============ 接管 fetch ============ */

  function isAiEndpoint(url) {
    return url.indexOf(ENDPOINT_KEY) !== -1 || url.indexOf(VERCEL_HOST) !== -1;
  }

  function fallbackResponse(payload) {
    return new Response(
      JSON.stringify({ code: 0, msg: 'ok', data: { content: composeLetter(payload) } }),
      { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (!isAiEndpoint(url)) return nativeFetch(input, init);

    var payload = {};
    try {
      payload = JSON.parse((init && init.body) || '{}') || {};
    } catch (e) {
      payload = {};
    }

    return new Promise(function (resolve) {
      var settled = false;
      var timers = [];
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;

      // 页面自身的 signal（28 秒超时）也联动过来
      if (ctrl && init && init.signal) {
        if (init.signal.aborted) ctrl.abort();
        else if (init.signal.addEventListener) {
          init.signal.addEventListener('abort', function () { ctrl.abort(); });
        }
      }

      function cleanup(abortRequest) {
        for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
        timers = [];
        hideSlowHint();
        if (abortRequest && ctrl) ctrl.abort();
      }

      function settle(res, abortRequest) {
        if (settled) return;
        settled = true;
        cleanup(abortRequest);
        resolve(res);
      }

      function useLocal(reason, silent) {
        if (!silent) {
          showToast(
            reason === 'offline'
              ? '网络不稳，已用本地代笔成稿'
              : reason === 'timeout'
                ? 'AI 响应超时，已用本地代笔成稿'
                : 'AI 暂时不可用，已用本地代笔成稿'
          );
        }
        settle(fallbackResponse(payload), true);
      }

      // 域名不可达：不再等待，直接本地成稿
      probeHost().then(function (ok) {
        if (!ok && !settled) useLocal('offline');
      });

      // 慢请求提示（只在页面还停在书写页时出现）
      timers.push(setTimeout(function () {
        if (settled) return;
        if (!document.querySelector('.ai-loading-page')) return;
        showSlowHint(function () { useLocal('manual', true); });
      }, SLOW_HINT_MS));

      // 最后兜底：页面脚本若没超时，这里也强制收口
      timers.push(setTimeout(function () {
        if (!settled) useLocal('timeout');
      }, REQUEST_CEILING_MS));

      var requestInit = init || {};
      if (ctrl) requestInit = Object.assign({}, init, { signal: ctrl.signal });

      nativeFetch(input, requestInit).then(function (res) {
        if (settled) return;
        if (!res.ok) {
          useLocal('error');
          return;
        }
        // clone 一份做校验，避免消费掉页面要读的 body
        res.clone().json().then(function (json) {
          if (settled) return;
          var content = json && json.code === 0 && json.data && json.data.content;
          if (typeof content === 'string' && content.trim()) {
            settle(res, false);
          } else {
            useLocal('error');
          }
        }).catch(function () {
          if (!settled) useLocal('error');
        });
      }).catch(function () {
        if (!settled) useLocal('timeout');
      });
    });
  };
})();
