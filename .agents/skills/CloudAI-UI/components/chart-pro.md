# ChartPro

- **何时用**:需要坐标轴 / tooltip / 多系列的**真图表**。fork 自 shadcn **v3 时代** `chart.tsx`（Recharts **v2** + Tailwind v3）。只装指标卡请用 `@cloudai/metric-card`（互不依赖）。
- **安装**:`npx shadcn@3 add @cloudai/chart-pro`（registry 已锁 `recharts@^2.15.0`，CLI 会按此范围安装；**若你的仓库已用 Recharts v3，安装会把它降级**，请先确认）
- **导入**:`import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, type ChartConfig } from '@/components/ui/chart-pro'`
- **依赖**:`recharts@^2`（**不要**装 Recharts v3）
- **与官方 `chart` 的关系**:**不可互换**。`npx shadcn@3 add chart` 拉的是当前官方版（Tailwind v4 + Recharts v3，`fill-(--color-x)` 等在 v3 下不合法）。本 item 用 `-pro` 避免覆盖业务仓官方 `chart.tsx`。
- **关键 API**:

  | 导出                                   | 说明                                                                              |
  | -------------------------------------- | --------------------------------------------------------------------------------- |
  | `ChartContainer`                       | 必须带 `min-h-*` / `aspect-*` / 固定高度，否则 ResponsiveContainer 首帧测不到尺寸 |
  | `config`                               | `ChartConfig`；颜色写 `hsl(var(--chart-N))`（bare HSL 三元组，支持 1..12）        |
  | `ChartTooltip` / `ChartTooltipContent` | 皮：`bg-popover/90 border-border shadow-md backdrop-blur-[1.5px]`                 |
  | children                               | 直接组合 recharts 元素（`BarChart` / `Bar` / …）                                  |

- **柱状图 + 阈值 recipe**（设计稿组合用法，**不是**组件 props）:

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="name" tickLine={false} axisLine={false} />
    <YAxis tickLine={false} axisLine={false} />
    <ChartTooltip
      cursor={{ fill: 'hsl(var(--muted))' }}
      content={<ChartTooltipContent />}
    />
    <ReferenceLine
      y={mean}
      stroke="hsl(var(--brand-6))"
      strokeDasharray="3 3"
      strokeWidth={1.5}
    />
    <Bar dataKey="value" radius={2}>
      {data.map((d, i) => (
        <Cell key={d.name} fill={`hsl(var(--chart-${(i % 12) + 1}))`} />
      ))}
    </Bar>
  </BarChart>
</ChartContainer>
```

- **约束**:
  - 阈值线、均值行、hover 列高亮、柱状三形态 / 横向柱 / 堆叠面积 / 环心百分比 / 半圆仪表盘均以 **story recipe** 交付，勿做成黑盒 props（DEC-017）。
  - **几何规范的落点**（DEC-076）：柱宽常量、极坐标中点、百分比 pill SVG、细环尺寸等可抽进 `chart-pro` 作共享 helper / 常量供 recipe 共用；**不要**在 chart-pro 再做一套 Bar/Line/Pie/Gauge 黑盒 API。
  - 柱宽自适应的严格色阶与现有 token 不匹配，见 DEC-075；手写 React 请按 recipe 的 `barCategoryGap` 几何（三形态统一 `37.5%`——该值是 band 左右**各**留一份，柱宽 = band − 2×gap，按单侧占比传会把柱宽算成 0），颜色用 `--chart-*`。
  - **完整交互见 Storybook `CloudAI UI/Console/ChartPro 图表`**。
