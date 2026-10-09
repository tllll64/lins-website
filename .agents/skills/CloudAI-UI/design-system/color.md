# Semantic color

**Covers:** 把已确认的操作、内容和状态映射到 CloudAI 语义颜色，并处理 Brand、Light/Dark、图表和 token 缺口。

**Use when:** 选择 Primary、Brand、文字、Surface（承载内容的背景层）、状态色、图表色、明暗模式、渐变或颜色 token 时。

**Does not cover:** 精确取值和完整列表查 `themes/<brand>-tokens.md`；状态含义和操作后果由需求或产品 Spec 定义；可见状态载体查 `states.md`；信息主次查 `hierarchy.md`；组件内部配色查组件文档和源码，本文只保留经多个共享状态组件验证的配色契约。

## 问题索引

- [区分 Primary、Brand 和 Destructive](#区分-primarybrand-和-destructive)
- [选择文字、Surface 和描边颜色](#选择文字surface-和描边颜色)
- [映射状态颜色](#映射状态颜色)
- [维护共享状态配色](#维护共享状态配色)
- [配置图表颜色](#配置图表颜色)
- [使用 token、明暗模式和完整值](#使用-token明暗模式和完整值)
- [验证颜色表达](#验证颜色表达)

## 区分 Primary、Brand 和 Destructive

### Do

- Primary 用于主要操作和控件激活状态：Button 使用默认 variant；Checkbox、Switch、Slider 沿用组件的 checked、on 或 value 样式。
- 需求已明确为 destructive 的操作使用组件的 destructive 样式。
- 核心任务交互区默认使用 `border-brand`；组件契约或业务规则要求强调当前状态时，描边使用 `border-brand-foreground`。键盘焦点仍保留 `ring-ring`。
- 没有组件契约时，品牌链接、当前选中项或运行中的 AI 任务使用 `text-brand-foreground`，并实测它与当前 Surface 的对比度。
- Brand Surface 使用 `bg-brand-background` 或 `bg-brand-accent-background`。文字和图标根据实测对比度选择 `text-brand-foreground`、`text-brand-accent-foreground` 或 `text-foreground`。
- 确需连续品牌色阶时再查 `brand-1` 至 `brand-12`。

### Don't

- 不用 Brand 替代 Primary。
- 不用 Brand 描边替代组件的 `ring-ring` 或 focus-visible 契约。
- 不用 Brand 代替 success、warning、destructive 等状态语义。
- 组件已有状态样式时，不在页面重新拼 Brand class。
- 不给 `brand-N` 固定“激活色、卡片底色、标题色”等业务含义。
- 同时存在 `*-background` 和 `*-foreground`，也不代表两者适合直接组成正文配色；仍需实测对比度。
- 不从颜色、按钮文案或组件外观反推操作风险。
- 不把 Brand scale 或 `chart-*` 用作普通控件颜色。

### 设计原则

核心交互区指直接承载核心任务的入口或区域，例如 AI 输入区。利用 Brand 强调这类区域的描边、Surface；区域内的 Button、Checkbox 等按组件规则使用 Primary。

## 选择文字、Surface 和描边颜色

### Do

| 对象                 | 写法                               |
| -------------------- | ---------------------------------- |
| 主要文字             | `text-foreground`                  |
| 次要文字             | `text-secondary-foreground`        |
| 最弱文字             | `text-muted-foreground`            |
| 页面 Surface         | `bg-background`                    |
| 容器 Surface         | `bg-card text-card-foreground`     |
| 次级 Surface         | `bg-muted`                         |
| 浮层                 | 沿用 Popover、Dialog 等组件配色    |
| 无组件契约的交互高亮 | `bg-accent text-accent-foreground` |
| 分隔线和容器边框     | `border-border`                    |
| 输入框边框           | 沿用组件的 `border-input`          |
| 焦点                 | 沿用组件焦点样式或 `ring-ring`     |

- 即使当前 brand 的主要文字与次要文字同色，仍按信息层级选择 token。
- hover、selected、placeholder 和 disabled 使用组件已有状态。

### Don't

- 不把次要文字统一降为 `text-muted-foreground`。
- 不从文字色推导边框透明度，不为页面另建灰阶。
- 不用多层 Card 代替内容分组。

### 设计原则

只有内容需要独立成区或进入浮层时，才增加独立 Surface。普通分组优先用标题、间距和边界表达；关系与主次查 `hierarchy.md`。

## 映射状态颜色

### Do

状态含义确认后按下表映射：

| 已确认含义                 | 颜色语义                                           |
| -------------------------- | -------------------------------------------------- |
| 成功                       | `success`                                          |
| 中性信息或正常运行         | `normal`                                           |
| 结果无法确认               | `unknown`                                          |
| 低、中、高严重度           | `warning-low` / `warning-medium` / `warning-high`  |
| 字段校验失败               | 组件 invalid / error 契约                          |
| 业务失败                   | 组件失败契约；没有时按已确认的影响映射 `warning-*` |
| 只读、无权限、缺少前置条件 | 相关组件状态                                       |

### Don't

- CloudAI 没有通用 `error-*` token，不自行创建别名。
- 业务失败不自动使用 Destructive。
- 涨跌、盈亏和用量变化不自动表示成功或失败。
- 不只靠颜色表达 success、warning、selected 或权限状态；至少再用文字、图标、形状、位置或内容变化中的一种。

### 设计原则

状态含义、严重程度和访问条件由需求或业务规则定义；`states.md` 只选择 Prototype 的可见载体和反馈样式。涨跌的颜色含义还要结合业务含义和目标地区，不能按数值正负直接判断。

## 维护共享状态配色

### Do

维护同时用文字、背景和描边表达状态的共享组件时，Light 保留三者，Dark 只覆盖背景和描边的透明度：

```tsx
<span className="border-success bg-success-background text-success-foreground dark:border-success/20 dark:bg-success-background/[0.07] border">
  运行中
</span>
```

- 文字不追加 Dark 覆盖。
- Dark 背景使用 `dark:bg-{status}-background/[0.07]`。
- Dark 描边使用 `dark:border-{status}/20`。
- Tailwind v3 没有 `/7`，必须写 `/[0.07]`。
- 已验证范围：StatusBadge、DataTable 状态单元、MessageBar 的部分状态区域和 AI Chain 状态区域。
- Light-only brand 不生成 Dark token scope；共享组件源码仍保留这些 `dark:` class。

### Don't

- 不在页面手拼三层状态 class。
- 不把 7% / 20% 外推为所有背景、所有组件或所有 brand 的通用公式。
- 组件另有渐变或专属配方时，不用这段代码覆盖源码契约。

## 配置图表颜色

### Do

- 使用当前 brand 生成的 `chart-*`。
- 同一数据系列在关联视图中保持同色。
- 用标签、数值、位置、线型或形状提供非颜色线索。
- 现有 token 无法表达所需色阶时记录缺口。

### Don't

- 不引入外部 palette，不默认用 Brand scale 替代 `chart-*`。
- 不从编号推断严重度、顺序、业务含义或深浅。

### 设计原则

分类比较使用定性配色，连续数值使用顺序色阶，围绕基准的变化使用发散色阶。Success、Warning 和 Destructive 只用于确有对应业务含义的数据。

## 使用 token、明暗模式和完整值

### Do

- 页面使用 semantic class，由当前 brand 切换实际取值；`darkMode: none` 的 brand 只使用亮色。
- 自定义 CSS 使用 bare-HSL 或 shadcn 三元组变量时，写完整颜色函数：`color: hsl(var(--foreground));`。full-value 完整颜色变量直接使用 `var(...)`。
- 复用完整渐变时使用 `themes/<brand>-tokens.md` 给出的 `bg-*` background-image class。
- 组件专属渐变若只是现有 design token 的组合，可按组件契约在 JSX `className` 的 Tailwind
  任意属性中用 `hsl(var(--token))` 组成；不为单个组件新增颜色 key。
- 多色品牌 SVG 和插画沿用资产自身颜色，不强行改成 semantic token。
- 没有合法表达时，先按准确 key 或 CSS 变量搜索 `themes/<brand>-tokens.md`，再检查组件能力。仍无结果时，记录缺少的 token、组件状态、使用场景和所需明暗模式。

### Don't

- 已有 semantic token 时，不重复写一套 `dark:bg-*` 或 `dark:text-*`；不用 `dark:` 绕过 token 缺口，也不继承其他 brand 的暗色。
- bare-HSL 和 shadcn 三元组变量不能直接写成 `color: var(--foreground);`；full-value 完整颜色变量不要再包 `hsl()`。
- 已有完整渐变 token 不能拆进 `from-*`、`via-*` 或 `to-*`。
- 不用硬编码颜色、外部 palette、相近语义或组件契约之外的任意透明度补缺口。

## 验证颜色表达

### Do

- 实测前景与背景组合；透明背景、渐变和图片检查对比度最低处。
- 覆盖当前 brand 支持的明暗模式，以及 default、hover、focus、selected、disabled 和 error。
- 检查状态和图表是否仍有非颜色线索，图表系列映射是否稳定。

### Don't

- 项目未声明标准或未实测时，标为“未验证”，不声称对比度已经通过。
- 不只检查 Light 默认态。
