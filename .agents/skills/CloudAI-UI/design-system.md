# CloudAI Design System

## 适用范围

适用于 CloudAI 控制台、设置页、数据列表、配置流程、AI 工作流和对话界面。当前基线是 **Tailwind CSS v3 + shadcn v3**；不要混用 v4、其他 shadcn 版本或外部设计系统。

## 使用规则

1. **颜色只用 CloudAI 已生成的 token。** 产品 UI 默认使用 semantic token；Brand scale 和 `chart-*` 仅用于 `design-system/color.md` 规定的品牌与图表场景。禁止硬编码颜色或使用无关的 Tailwind palette。
2. **Primary、Brand、Destructive 各司其职。**
   - `primary`：主要操作，以及 Checkbox、Switch、Slider 等控件已有的 checked / on / value 状态。
   - Brand：品牌识别，以及核心任务交互区的 Surface、默认描边和已定义状态的强调描边；具体用法查 `design-system/color.md`。
   - `destructive`：删除已有数据或版本、撤销权限，或明确丢弃用户内容。具体后果必须来自需求。
3. **沿用既有主题与刻度。** semantic token 自动适配 brand；brand 支持 Dark 时自动切换明暗。已有语义能表达时不另写 `dark:`。间距和字号使用 Tailwind v3 默认刻度，圆角优先使用标准 `rounded-*`；有标准值时不用任意值。
4. **先复用组件。** 先查 CloudAI 组件，再查项目已有的 shadcn 组件。尺寸、状态、键盘行为和动效服从组件契约。
5. **按真源查询。** 颜色、完整 CSS 值、圆角和 Dark 模式支持查 `themes/<brand>-tokens.md`；组件 API 与内部规格查组件文档和源码。按准确 key 搜索无结果，说明当前 brand 未生成该 token；不要猜测别名或 class。
6. **不补充未确认事实。** token、组件状态或动效能力不足时，写明缺少什么及使用场景。无法确认的字段、指标和状态标为待确认；原型数据标为模拟。

## 按问题读取

| 问题                                                   | 读取                            |
| ------------------------------------------------------ | ------------------------------- |
| 信息主次、分组、阅读顺序与呈现方式                     | `design-system/hierarchy.md`    |
| 位置、尺寸、对齐、滚动、响应式与输入方式               | `design-system/layout.md`       |
| loading、empty、error、控件状态与反馈样式              | `design-system/states.md`       |
| Primary、Brand、状态色、Light/Dark 与 token 缺失       | `design-system/color.md`        |
| 动效目的、使用边界与已有 CloudAI 动效 class            | `design-system/motion.md`       |
| token key、CSS 变量、圆角、Dark 模式支持与实际生成取值 | 搜索 `themes/<brand>-tokens.md` |

### 读取方式

- 单点问题只读对应文件；已有上游结论时直接使用，不重复论证。
- 页面结构按 `design-system/hierarchy.md` → `design-system/layout.md`；需求或组件先定义状态含义，`design-system/states.md` 再选择可见载体，`design-system/color.md` / `design-system/motion.md` 负责表达。
- 完整页面通常先读 `design-system/hierarchy.md` 和 `design-system/layout.md`，只在任务涉及相应问题时增加其他 reference，不一次通读全部文件。
- 准确值查 `themes/<brand>-tokens.md`，组件行为查组件契约；不能从颜色、动画或现有组件反推业务含义。
- 无障碍：内容顺序查 `design-system/hierarchy.md`；重排后的视觉、DOM 与焦点顺序查 `design-system/layout.md`；非颜色线索查 `design-system/color.md`；reduced motion 查 `design-system/motion.md`；组件内部 ARIA 与焦点管理查组件契约。

## 输出边界

- 单点问题：给出结论、适用条件和待确认项。
- 页面骨架：说明任务信息层级和布局，不虚构未涉及的状态。
- 交互原型：核心路径和必要状态必须可操作；用本地交互模拟，不补产品或系统行为。非核心控件可只呈现外观，不补未要求的页面或路由。
