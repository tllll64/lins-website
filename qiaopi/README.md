# /qiaopi/ 部署说明

这里是 `dearyou_letter`（侨批活动）的**构建产物**，不是源码。源码在另一个仓库
（`weremit-web-1/apps/activity/src/dearyou_letter`），本目录经过手工后处理，
所以**重新构建并覆盖本目录会丢掉下面的优化**，重建后请照这份说明再处理一次。

## 做过的手工改动

1. **图片本地化 + 压缩**：原来所有图都热链 `weremit-static.tenpay.com`，
   换成了 `assets/img/*.webp`（同源，随页面一起走 GitHub Pages 的缓存与压缩）。
   12 张图从 2.6MB PNG 压到 258KB WebP；封面 4 张从 392KB 压到 142KB。
   `index-CmFAueBN.js` / `index-BOI8giLP.css` 里的原图 URL 已替换。
   *注意：通过 Vue CSS 变量（`useCssVars`）绑定的背景图，浏览器是按样式表
   位置解析相对路径的，所以统一写成 `/qiaopi/assets/img/...` 绝对路径。*
2. **首屏预加载**：`index.html` 里用 `<link rel="preload" as="image">` 提前拉封面
   四张图，不再等 436KB 的 JS 执行完才发请求。
3. **静态首屏骨架**：`#boot-cover` 是与 `CoverPage.vue` 同尺寸的纯 HTML/CSS 封面，
   JS 到达前就能看到封面；Vue 挂载后 `#app:not(:empty)+#boot-cover{display:none}`
   自动隐藏，视觉上无跳变。**改动 CoverPage.vue 的尺寸/位置时这里要同步改。**
4. **8.3MB 字体延迟加载**：`汉仪尚巍手书`（XiBao）只在写信时才需要，原来页面一打开
   就 `document.fonts.load` 全量下载（与封面图抢带宽），现在改成首次交互
   （pointerdown/touchstart/keydown）或 10 秒后才开始加载。
   字体文件本身仍热链原 CDN，未搬运。
5. `Noto Serif SC` 的 woff2 本地化到 `assets/font/noto-serif-sc.woff2`（原 ttf 兜底仍走 CDN）。
6. 顺手补了原来为空的 `<title>`。

## 保留为远程的引用

- `XiBao` 手书字体 ttf（商用字体，未重分发）
- `Noto Serif SC` 的 ttf 兜底
- 微信分享缩略图 `1783478123604_f38d8402.png`（页面加载不会请求它）

## 本地预览

```bash
python3 -m http.server 8080   # 然后在浏览器打开 http://127.0.0.1:8080/qiaopi/
```
