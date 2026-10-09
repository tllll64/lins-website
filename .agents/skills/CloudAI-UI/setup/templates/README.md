# {{appName}}

由 CloudAI UI 的 `setup/create-app.mjs` 生成：Vite + React 18 + TypeScript + Tailwind v3 +
shadcn，主题为 **{{brand}}**。

## 起步

```bash
pnpm install
pnpm dev
```

首屏是页面外壳骨架（`src/app-shell.tsx`），虚线框都是插槽，替换成真实内容即可。

## 装组件

```bash
npx {{shadcnCli}} add {{registryNamespace}}/status-badge   # CloudAI 自研组件
npx {{shadcnCli}} add button                               # 官方 shadcn 组件
```

`{{registryNamespace}}` 别名已写在 `components.json` 里。**务必带 `{{shadcnCli}}`**：裸
`npx shadcn` 会拉到面向 Tailwind v4 的 CLI，装出的组件在本工程一条样式都不生成，且不报错。

## 主题

`tailwind.config.js` 顶部那行 import 决定主题，换主题就换它的 subpath。语义 token
（`bg-primary`、`text-muted-foreground`、`bg-brand-2` …）由插件注入，**不要**往 `src/index.css`
手写 `:root` 变量。{{darkNote}}

## AI 协作

CloudAI UI 的设计语境已装在 `.agents/skills/CloudAI-UI/`。写 UI 前先读它的 `SKILL.md`：
里面有整页模板、组件选型表、token 取值与红线，按问题读对应文件，不要通读。
