# 已有 Tailwind v3 + shadcn 工程：接 CloudAI 主题

只改三处配置：包、插件注册、组件 registry 别名。**不动**对方的构建工具、CSS 入口结构和目录约定。

前置：`tailwindcss@3.x` + `postcss` + `autoprefixer`、有 `tailwind.config.js`（不是 v4 的
`@tailwindcss/vite`）。

## 1. 装主题包

```bash
pnpm add @cloudai-design/tailwind
```

## 2. 注册插件

`tailwind.config.js`：

```js
import cloudaiTheme from '@cloudai-design/tailwind/v3/aidbs';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // 保留你自己的 glob
  plugins: [tailwindcssAnimate, cloudaiTheme],
};
```

插件注入语义色（`bg-primary`、`text-foreground`、`border-border`）、业务 token
（`bg-brand-2`、`text-success-foreground` 等）、圆角刻度与动效。给 `<html>` 加 `.dark` 即切暗色，语义 token 自动翻转，正常不必写 `dark:`。

**接完必须清掉两处旧真源**，否则颜色对不上而不会报错：

- CSS 入口里 shadcn 或旧方案写下的 `@layer base { :root { --primary: … } }` 变量块——删掉，
  只留 `@tailwind base; @tailwind components; @tailwind utilities;`；
- `tailwind.config.js` 里手写的 `colors` / `borderRadius`——删掉，插件已经给了。

`content` glob 要覆盖所有写 className 的文件（含从本 skill 抄出去的页面模板），漏掉的文件里
类名会被 purge：症状是那个组件没有样式，构建不报错。

## 3. 配组件 registry 别名

`components.json` 里加：

```json
"registries": {
  "@cloudai": "https://o.alicdn.com/cloudai/cloudai/v3/r/default/{name}.json"
}
```

之后装组件：

```bash
npx shadcn@3 add @cloudai/status-badge   # CloudAI 组件
npx shadcn@3 add button                    # 官方 shadcn 组件
```

CLI 版本要钉住：裸 `npx shadcn` 会拉到面向 Tailwind v4 的版本，装出的组件在 v3 下不生成样式。

## 4.（可选）lint 护栏

```bash
pnpm add -D @cloudai-design/eslint-plugin
```

```js
plugins: ['@cloudai-design'],
extends: ['plugin:@cloudai-design/recommended-tailwind3'],
```

它把「用了硬编码色值 / 不存在的 token」变成 lint 报错，而不是靠人眼看出来。

## 验证

```bash
pnpm build && pnpm dev
```

- Button 等组件有正确的背景色与圆角（不是无样式的白底黑字）；
- 业务 token 生效：随便写个 `bg-brand-2` 或 `text-success-foreground` 能出颜色；
- 给 `<html>` 加 `.dark` 后语义色整体翻转（只有亮色的主题除外）；
- CSS 入口里没有第二份 `:root` 变量。
