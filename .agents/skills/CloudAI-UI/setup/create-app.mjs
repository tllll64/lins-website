#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * 从模板搭一个能跑的 Tailwind v3 + shadcn + CloudAI 主题工程。
 *
 * 用法（在本 skill 目录下）：
 *   node setup/create-app.mjs <dir> [--brand <brand>] [--force]
 *
 * 为什么是脚本而不是 SKILL.md 里的步骤：搭建流程每一步都有静默失败形态——裸
 * `npx shadcn` 拉到面向 Tailwind v4 的 CLI、`shadcn init` 往 CSS 入口写一份 `:root`
 * 变量与主题插件抢真源、`content` glob 漏文件让类名被 purge。用散文让人（或 AI）照做，
 * 每次错法都不同且都不报错，症状只是「颜色不对」或「整页全白」。
 *
 * 所以这里也**不调** `create vite` 与 `shadcn init`：直接写出正确的文件，没有事后清理。
 *
 * 地址、依赖范围与主题清单来自同目录 `scaffold.json`（打包时从 CloudAI UI 仓的
 * tools/delivery.ts 与各 package.json 生成），本文件不含手抄的版本号或 URL。
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SETUP_DIR = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = resolve(SETUP_DIR, '..');
const TEMPLATE_DIR = join(SETUP_DIR, 'templates');
const SCAFFOLD_FILE = join(SETUP_DIR, 'scaffold.json');

/** 模板里存成下划线名的文件，写盘时改回原名。 */
const RENAMES = {
  '_package.json': 'package.json',
  _npmrc: '.npmrc',
  _gitignore: '.gitignore',
};

/** 页面模板 `app-shell` 在本 skill 内的目录。首屏抄它，不在模板里存第二份布局代码。 */
const APP_SHELL_DIR = 'page-templates/app-shell';
/** `src/app-shell.tsx` 是 App.tsx 引用的那份，必须存在。 */
const APP_SHELL_ENTRY = 'app-shell.tsx';
/** 装进新工程的 skill 落点：让这个工程之后被单独打开时也带着语境。 */
const SKILL_INSTALL_DIR = '.agents/skills/CloudAI-UI';

export function readScaffold() {
  if (!existsSync(SCAFFOLD_FILE)) {
    throw new Error(
      `缺少 ${SCAFFOLD_FILE}：它随本 skill 一起打包，包可能不完整`,
    );
  }
  return JSON.parse(readFileSync(SCAFFOLD_FILE, 'utf8'));
}

export function listTemplateFiles(dir = TEMPLATE_DIR, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...listTemplateFiles(join(dir, entry.name), rel));
    } else {
      out.push(rel);
    }
  }
  return out.sort();
}

/** 模板路径 → 目标路径：只有末段参与改名，`src/…` 这类前缀原样保留。 */
export function targetPathOf(templateRel) {
  const segments = templateRel.split('/');
  const last = segments[segments.length - 1];
  segments[segments.length - 1] = RENAMES[last] || last;
  return segments.join('/');
}

/**
 * 只把骨架与运行辅助文件搬进 src；参考实现保留在安装后的 skill 内，
 * 避免未使用的参考页引入尚未安装的 registry 组件。
 */
export function listAppShellFiles() {
  const dir = join(SKILL_ROOT, APP_SHELL_DIR);
  if (!existsSync(dir)) {
    throw new Error(`本 skill 里找不到 ${APP_SHELL_DIR}：包可能不完整`);
  }
  const entries = readdirSync(dir, { withFileTypes: true });
  const nested = entries.filter((entry) => entry.isDirectory());
  if (nested.length > 0) {
    throw new Error(
      `${APP_SHELL_DIR} 下出现子目录（${nested
        .map((entry) => entry.name)
        .join(', ')}）：拷贝策略只处理平铺 tsx`,
    );
  }
  const files = entries
    .filter(
      (entry) =>
        entry.name.endsWith('.tsx') && !entry.name.endsWith('.reference.tsx'),
    )
    .map((entry) => entry.name)
    .sort();
  if (!files.includes(APP_SHELL_ENTRY)) {
    throw new Error(
      `${APP_SHELL_DIR} 里没有 ${APP_SHELL_ENTRY}：src/App.tsx 引用的就是它`,
    );
  }
  return files;
}

/** npm 包名允许的字符：目录名可能带空格或大写，直接写进 package.json 会装不上。 */
function toPackageName(raw) {
  const name = String(raw)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[-_.]+|[-_.]+$/g, '');
  return name || 'cloudai-app';
}

export function buildVars({ scaffold, brand, appName }) {
  const meta = scaffold.brands[brand];
  if (!meta) {
    throw new Error(
      `主题 "${brand}" 不在清单里（可用：${Object.keys(scaffold.brands).join(', ')}）`,
    );
  }
  return {
    appName: toPackageName(appName),
    brand,
    tailwindPlugin: meta.tailwindPlugin,
    iconLibrary: meta.iconLibrary,
    shadcnCli: scaffold.shadcnCli,
    registryNamespace: scaffold.registryNamespace,
    registryItemUrl: scaffold.registryItemUrl,
    dependencies: JSON.stringify(scaffold.dependencies, null, 2),
    devDependencies: JSON.stringify(scaffold.devDependencies, null, 2),
    darkNote: meta.hasDarkMode
      ? '给 `<html>` 加 `.dark` 即切暗色，语义 token 自动翻转，正常不必写 `dark:`。'
      : '本主题只有亮色一套取值，`.dark` 下沿用亮色，不要为它手写暗色变量。',
  };
}

/** 渲染后不许残留 `{{`：占位符拼错时当场失败，而不是把 `{{brand}}` 写进用户工程。 */
function render(source, vars, label) {
  const out = source.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in vars)) {
      throw new Error(`${label} 用了未知占位符 ${match}`);
    }
    return vars[key];
  });
  // 只找 `{{name}}` 形态：正文里合法出现的 `style={{}}` 不是占位符。
  const left = out.match(/\{\{\w+\}\}/g);
  if (left) {
    throw new Error(
      `${label} 渲染后仍有未替换的占位符 ${[...new Set(left)].join(' ')}`,
    );
  }
  return out;
}

/** package.json 里注入的是 JSON 片段，缩进由 stringify 统一，不靠模板里的空格对齐。 */
function normalizeIfPackageJson(targetRel, text) {
  if (targetRel !== 'package.json') {
    return text;
  }
  return `${JSON.stringify(JSON.parse(text), null, 2)}\n`;
}

/**
 * @param {object} opts
 * @param {string} opts.targetDir 目标工程绝对路径
 * @param {string} opts.brand
 * @param {boolean} [opts.force] 允许覆盖已存在的文件
 * @param {boolean} [opts.installSkill] 把本 skill 拷进新工程的 .agents/skills/
 */
export function createApp({
  targetDir,
  brand,
  force = false,
  installSkill = true,
}) {
  const scaffold = readScaffold();
  const vars = buildVars({
    scaffold,
    brand,
    appName: targetDir.split(/[/\\]/).filter(Boolean).pop(),
  });

  // 已有工程不碰：往别人配好的构建里塞我们的模板文件只会把两边都弄坏。
  if (!force && existsSync(join(targetDir, 'package.json'))) {
    throw new Error(
      `${targetDir} 已经是一个工程（有 package.json）。` +
        `已有 Tailwind v3 + shadcn 工程直接照 SKILL.md 的接入清单改配置；确实要覆盖加 --force`,
    );
  }

  const planned = listTemplateFiles().map((templateRel) => ({
    templateRel,
    targetRel: targetPathOf(templateRel),
  }));
  const shellFiles = listAppShellFiles().map((name) => ({
    source: join(SKILL_ROOT, APP_SHELL_DIR, name),
    targetRel: `src/${name}`,
  }));

  const collisions = [
    ...planned.map((item) => item.targetRel),
    ...shellFiles.map((item) => item.targetRel),
  ]
    .filter((targetRel) => existsSync(join(targetDir, targetRel)))
    .sort();
  if (collisions.length > 0 && !force) {
    throw new Error(
      `${targetDir} 下这些文件已存在，拒绝覆盖（加 --force 强制）：\n  ${collisions.join('\n  ')}`,
    );
  }

  const written = [];
  for (const { templateRel, targetRel } of planned) {
    const source = readFileSync(join(TEMPLATE_DIR, templateRel), 'utf8');
    const target = join(targetDir, targetRel);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(
      target,
      normalizeIfPackageJson(targetRel, render(source, vars, templateRel)),
    );
    written.push(targetRel);
  }

  for (const { source, targetRel } of shellFiles) {
    const target = join(targetDir, targetRel);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(source, target);
    written.push(targetRel);
  }

  // 自拷贝而不是重写一份说明：新工程被单独打开时，语境要跟着在。
  // 目标目录在 skill 内部时不能拷（会把自己拷进自己）。
  if (installSkill && !resolve(targetDir).startsWith(`${SKILL_ROOT}/`)) {
    const skillTarget = join(targetDir, SKILL_INSTALL_DIR);
    mkdirSync(dirname(skillTarget), { recursive: true });
    cpSync(SKILL_ROOT, skillTarget, { recursive: true });
    written.push(`${SKILL_INSTALL_DIR}/`);
  }

  return { targetDir, brand, files: written.sort(), scaffold };
}

function parseArgs(argv) {
  const args = { _: [], installSkill: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--brand' || a === '-b') args.brand = argv[++i];
    else if (a.startsWith('--brand=')) args.brand = a.slice('--brand='.length);
    else if (a === '--force' || a === '-f') args.force = true;
    else if (a === '--no-skill') args.installSkill = false;
    else args._.push(a);
  }
  return args;
}

function main(argv) {
  const args = parseArgs(argv);
  const scaffold = readScaffold();
  const brands = Object.keys(scaffold.brands);

  if (!args._[0]) {
    console.log(
      [
        '用法: node setup/create-app.mjs <dir> [--brand <brand>] [--force] [--no-skill]',
        `可用主题: ${brands.join(', ')}（默认 ${scaffold.defaultBrand}）`,
      ].join('\n'),
    );
    process.exit(1);
  }

  const brand = args.brand || scaffold.defaultBrand;
  if (!scaffold.brands[brand]) {
    console.error(`✗ 主题 "${brand}" 不在清单里（可用：${brands.join(', ')}）`);
    process.exit(1);
  }

  const targetDir = isAbsolute(args._[0])
    ? args._[0]
    : resolve(process.cwd(), args._[0]);

  let created;
  try {
    mkdirSync(targetDir, { recursive: true });
    created = createApp({
      targetDir,
      brand,
      force: Boolean(args.force),
      installSkill: args.installSkill,
    });
  } catch (err) {
    console.error(`✗ ${err.message || err}`);
    process.exit(1);
  }

  console.log(
    `✓ 工程已创建（${created.files.length} 项，主题 ${brand}）→ ${targetDir}`,
  );
  console.log('下一步：');
  console.log(`  cd ${args._[0]} && pnpm install && pnpm dev`);
  console.log(
    `  装组件：npx ${created.scaffold.shadcnCli} add ${created.scaffold.registryNamespace}/<name>（别名已写好；勿用裸 npx shadcn）`,
  );
  console.log('  首屏是页面外壳骨架 src/app-shell.tsx，把插槽换成真实内容即可');
}

// 被 import 时（门禁复用其中的纯函数）不跑 main。
if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
) {
  main(process.argv.slice(2));
}
