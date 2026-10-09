# StatusBadge

- **何时用**:实例/任务等**状态 pill**——六档状态色 + 可选字形/圆点图标。已有 `@cloudai/status-badge` 时优先安装，勿手搓三 token pill。
- **安装**:`npx shadcn@3 add @cloudai/status-badge`
- **导入**:`import { StatusBadge } from '@/components/ui/status-badge'`
- **依赖**:`lucide-react`（默认图标）
- **导出**:`StatusBadge`；类型 `StatusBadgeStatus` / `StatusBadgeIconVariant` / `StatusBadgeProps`
- **关键 props**:
  | prop          | 类型                                                                                        | 说明                                       |
  | ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
  | `status`      | `"unknown" \| "success" \| "normal" \| "warning-high" \| "warning-medium" \| "warning-low"` | 默认 `"unknown"`；驱动三 token 配色        |
  | `iconVariant` | `"glyph" \| "dot" \| "none"`                                                                | 默认 `"glyph"`；互斥三形态，勿拆成两个布尔 |
  | `icon`        | `ReactNode`                                                                                 | 覆盖默认字形；仅 `glyph` 生效              |
  | `children`    | `ReactNode`                                                                                 | 状态文案（组件无内置文案）                 |
  | 其余          | `span` props                                                                                | `className` 用 `cn()` 合并                 |
- **最小示例**:

```tsx
<StatusBadge status="success">运行中</StatusBadge>
<StatusBadge status="normal">配置中</StatusBadge>
<StatusBadge status="warning-high" iconVariant="dot">不可用</StatusBadge>
```

- **约束**:组件内部按 status 使用 foreground / background / border 三层 semantic token，并在 Dark 下沿用源码中的透明度契约；图标默认 `size-3`。`warning-medium` / `warning-low` 默认 `CircleAlert`；业务状态含义和后端枚举 → `status` 的映射由需求与业务代码提供，`design-system/states.md` 只选择可见载体，颜色语义由 `design-system/color.md` 映射；准确 class 以本组件源码为准。**完整交互见 Storybook `CloudAI UI/Console/StatusBadge 状态标签`**。
