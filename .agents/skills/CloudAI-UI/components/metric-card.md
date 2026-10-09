# MetricCard

- **何时用**:AI 回复 / 仪表盘里的**单指标卡**（标签 + 大数字 + 副说明）。零运行时依赖；不需要坐标轴时优先于 `chart-pro`。
- **安装**:`npx shadcn@3 add @cloudai/metric-card`
- **导入**:`import { MetricCard, MetricCardBadge, MetricCardTitle, MetricCardDescription } from '@/components/ui/metric-card'`
- **依赖**:无（图标由业务放进 Badge children）
- **导出**:`MetricCard` / `MetricCardBadge` / `MetricCardTitle` / `MetricCardDescription`
- **关键 props**:全部为透传容器 props；内容一律走子组件，**无** `badge` / `title` / `description` 具名 ReactNode prop。
- **最小示例**:

```tsx
<MetricCard>
  <MetricCardBadge>
    <Award className="size-4" />
    Top1 销售额经理
  </MetricCardBadge>
  <MetricCardTitle>Joao Silva</MetricCardTitle>
  <MetricCardDescription>总销售额 241,714.12 元</MetricCardDescription>
</MetricCard>
```

- **约束**:标签用 `bg-brand-1 text-brand-6`（**Brand ≠ Primary**）。卡片不设固定宽高。不写 Badge / 不写 Description 即无对应区块。**完整交互见 Storybook `CloudAI UI/Console/MetricCard 指标卡`**。
