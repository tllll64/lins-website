# RichLink

- **何时用**:AI 回复 / 控制台里的**关联产品或 Agent 跳转入口**（渐变卡 + 标题 + 徽章 + 一句话描述 + 右侧图标）。分组标题用普通 Heading，不要另造 Group 组件。
- **安装**:`npx shadcn@3 add @cloudai/rich-link`
- **导入**:`import { RichLink, RichLinkIcon, RichLinkTitle, RichLinkBadge, RichLinkDescription } from '@/components/ui/rich-link'`
- **依赖**:`lucide-react`（外链箭头；图标槽内容由业务传入）
- **导出**:`RichLink` / `RichLinkIcon` / `RichLinkTitle` / `RichLinkBadge` / `RichLinkDescription`
- **关键 props**:
  | prop   | 类型                   | 说明                                           |
  | ------ | ---------------------- | ---------------------------------------------- |
  | `href` | `string?`              | 有则根节点为 `<a>`，否则 `<div role="button">` |
  | `kind` | `"product" \| "agent"` | 默认 `product`；影响 Badge 默认文案与配色      |
  | 其余   | 容器透传               | `className` / 事件等                           |
- **最小示例**:

```tsx
<RichLink href="/sql" kind="product">
  <RichLinkIcon>
    <LayoutGrid className="size-5" />
  </RichLinkIcon>
  <RichLinkTitle>SQL Console</RichLinkTitle>
  <RichLinkBadge />
  <RichLinkDescription>编写、执行和调试 SQL 工作台</RichLinkDescription>
</RichLink>
```

- **约束**:
  - 渐变底用既有 `bg-brand-gradient`，**不引入新 token**。
  - 内容一律走子组件；图标是 ReactNode 槽。
  - 多个入口用 Stack 包裹，分组标题用 Heading。
  - **完整交互见 Storybook `CloudAI UI/Console/RichLink 富跳转入口`**。
