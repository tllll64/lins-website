# CloudAI 页面模板

`components.md` 给的是**零件**，本节给的是**整页**：一个模板 = 布局范式 + 组件组合 + 状态覆盖，
拿来即改，不用从选型开始推。

## 与相邻 skill 的边界

| 你要的                                   | 读这个                     |
| ---------------------------------------- | -------------------------- |
| 某个组件怎么用 / 选哪个组件              | `components.md`            |
| 信息层级、布局、状态、颜色、动效与 token | `design-system.md`         |
| **一整页的成品骨架**                     | 本节                       |
| 本节没有对应模板，要现场出方案           | `design-spec-generator.md` |
| 页面写完了要走查                         | `design-review.md`         |

## 模板管到哪一层

**模板只管视图层**：页面怎么分区、哪一层滚、窄屏先收哪一块、每个槽允许放什么、每个状态长什么样。
这些是「AI 一次性生成必错」的东西，照抄不要重算。**其余一律以你的仓库为准，模板不表态。**

| 模板钉死                               | 归你的仓库                                       |
| -------------------------------------- | ------------------------------------------------ |
| 区域划分、块间距、内容列宽、圆角与描边 | 数据怎么取、缓存与轮询、失败重试策略             |
| 滚动归属：谁滚、谁 sticky、谁不滚      | 路由、鉴权、埋点                                 |
| 插槽的允许放 / 禁止放 / 空态           | 槽里真正放哪些字段、文案与图标                   |
| 每个状态的呈现与影响范围               | 状态从哪来：服务端数据还是本地 state，用什么库管 |
| 哪个槽该用哪个组件、组件之间怎么摆     | 组件的具体 props 以你装的那个版本为准            |

**md 里的代码片段是示意，不是可运行的业务代码。** 它要说的只有一件事：这个槽用哪个组件、哪几个
prop 是关键。变量名与数据结构都是占位。照着写完发现和你仓库里的 API 对不上时**以仓库为准**——
去读 `components.md` 里那个组件的文档，别为了让片段跑起来改组件或降版本。

**还原件示范的是「设计稿怎么还原成组件」**，不是给你抄成页面的成品。看它某个槽用了哪个组件、层级
怎么套、边距怎么给，然后用你自己的数据重写一遍。

## 选型表

**先在这张表里选，再去读模板。** 表里没有匹配项时不要挑一个最像的凑，走下面「没有匹配模板时」。

| 模板                                                         | 何时选它                                                                                      | 抄（骨架）                                                                           | 看（还原）                                                                                               |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [`app-shell`](page-templates/app-shell.md)                   | 要做一个带顶栏 + 左侧导航的 CloudAI 产品页面。**下面每个内容模板都先套它**                    | [`app-shell.tsx`](page-templates/app-shell/app-shell.tsx)                            | [`app-shell.reference.tsx`](page-templates/app-shell/app-shell.reference.tsx)                            |
| [`agent-chat-home`](page-templates/agent-chat-home.md)       | 用户要与 AI Agent 对话：新建对话、续接历史会话。画的是**还没有对话**那一屏（欢迎语 + 输入框） | [`agent-chat-home.tsx`](page-templates/agent-chat-home/agent-chat-home.tsx)          | [`agent-chat-home.reference.tsx`](page-templates/agent-chat-home/agent-chat-home.reference.tsx)          |
| [`agent-conversation`](page-templates/agent-conversation.md) | 对话**已经开始**：来回的消息流，回复里夹着思考、工具调用、执行计划与产出文件，底部常驻追问框  | [`agent-conversation.tsx`](page-templates/agent-conversation/agent-conversation.tsx) | [`agent-conversation.reference.tsx`](page-templates/agent-conversation/agent-conversation.reference.tsx) |
| [`overview`](page-templates/overview.md)                     | 用户要了解 Agent 的整体能力：功能介绍、核心卖点、快速上手入口                                 | [`overview.tsx`](page-templates/overview/overview.tsx)                               | [`overview.reference.tsx`](page-templates/overview/overview.reference.tsx)                               |
| [`usage-list`](page-templates/usage-list.md)                 | 看**一个量**是怎么花掉的：上方总量与趋势，下方是这个量的明细流水。只读                        | [`usage-list.tsx`](page-templates/usage-list/usage-list.tsx)                         | [`usage-list.reference.tsx`](page-templates/usage-list/usage-list.reference.tsx)                         |
| [`resource-list`](page-templates/resource-list.md)           | 在**一批同类对象**里找到某一个并操作它：卡片或表格两种呈现，可增删改                          | [`resource-list.tsx`](page-templates/resource-list/resource-list.tsx)                | [`resource-list.reference.tsx`](page-templates/resource-list/resource-list.reference.tsx)                |
| [`quick-start`](page-templates/quick-start.md)               | 第一次配置一个东西，**按顺序走 2～4 步**才算完：每步一个选择或一组参数，走完才有产物          | [`quick-start.tsx`](page-templates/quick-start/quick-start.tsx)                      | [`quick-start.reference.tsx`](page-templates/quick-start/quick-start.reference.tsx)                      |

Agent 分栏工作台、详情预览页在建，尚不可用。

**`usage-list` 与 `resource-list` 都长得像 dashboard**（面包屑 + 页头 + 概览 + 表格 + 分页），用一个问题分开：**表里一行点开是什么？**

| 一行是                                                       | 选它            | 例                                          |
| ------------------------------------------------------------ | --------------- | ------------------------------------------- |
| 一个**对象**：有名字与状态，能改名、能删、能进它自己的详情页 | `resource-list` | 工作空间、知识库文件、Agent、数据源、模型   |
| 一条**记录**：只读的流水，改不了也删不了                     | `usage-list`    | Credit 用量、Token 消耗、调用明细、配额流水 |

**别拿「有没有概览卡」当判据**——两页都可能有，差别在它是不是主角：`usage-list` 缺了概览就不是这一页；`resource-list` 的概览是可选配角，删掉页面照样成立。「有没有搜索筛选」同理，两页都有。

**内容列宽按页面类型选，不要统一**，判据是这一页给谁看：

| 类型     | 列宽                          | 适用                                 |
| -------- | ----------------------------- | ------------------------------------ |
| 聚焦阅读 | 居中限宽 680 或 800           | 对话首页 680、概览页 800、对话页 800 |
| 全宽数据 | 撑满，左右内边距 36           | 用量列表、资源列表                   |
| 表单向导 | 居中封顶 1000，左右内边距 160 | 快速开始                             |

对话输入场景用窄列聚焦打字区、减少视线跳动；阅读浏览场景用宽列适合图文并排；数据浏览场景不限宽，
宽度就是拿来放列的；表单向导场景封顶，一行控件横跨整屏没人扫得完。新页面照这个判据挑。

## 怎么用

**每个模板两份 tsx**，和同名的 `<name>.md` 并排。md 是契约。**抄 `<name>.tsx`（挖空骨架），看
`<name>.reference.tsx`（设计稿还原）。** 只读 md 会自己重写一遍；只抄还原件会把占位句当成上线文案。

填某个 `SLOT:` 时打开还原件，看这个槽里该长什么样（侧栏有哪些变体、演示卡是图标 + 标题 + 一句），
再用你自己的数据写一遍。还原件里的「产品名称」「场景案例标题」是占位句，变体种类按需删减。

页面模板是**抄改物料**：把 tsx 复制进自己的页面再改，不通过 `import` 使用。所以模板不是带 props 插槽
的组件——页面布局天生要改，一旦被 `import` 就改不动。也不要去 `shadcn add`，模板不在组件 registry 里。

两步：

1. 抄 `page-templates/app-shell/app-shell.tsx`，对照 `app-shell.reference.tsx` 填 `SLOT:`。外壳只抄一次。
2. 抄对应的内容模板骨架，对照它的 `.reference.tsx` 填槽，挂进外壳的 `PageContent`。

每份 md 给的是同一套东西：场景判据、不可变量、插槽表（允许放什么 / 禁止放什么 / 空态）、状态、响应式、
增强项。**不可变量与滚动归属照抄，不要重算**——那些数字是从设计稿逐条对过账的，看着像可以凭手感调，
一调就是侧栏一收布局崩、或者整页跟着滚。

tsx 里的占位组件（如 `SlotBox`）只是让骨架看得见边界，抄完连它一起删掉。

## 没有匹配模板时

1. **不要**即兴发明一个「CloudAI 标准列表页模板」当成规范引用。
2. 读 `design-spec-generator.md` 现场产出设计规格；先按当前任务读取 `design-system.md` 的
   `design-system/hierarchy.md` 与 `design-system/layout.md`，不要把页面类型当成可套用的固定模板。
3. 如果这一页做完后被复用了两次以上，它就是模板的候选——反馈给 CloudAI UI owner 收编进本节。

## 模板收编标准（给 owner）

模板有两条入口，任一条成立即可，其余条目都要满足：

| 入口         | 门槛                                                          |
| ------------ | ------------------------------------------------------------- |
| 设计规范驱动 | 设计师已交付设计稿 + 构成表（区域逐条标明固定 / 插槽 / 增强） |
| 业务沉淀驱动 | 至少 **2 个业务**已按它落地，且排版没有各自魔改               |

- 组件全部来自 `components.md` 或官方 shadcn，没有一次性自研件；
- 颜色只用 semantic token，间距与圆角使用现有 Tailwind 刻度或当前环境已生成的覆盖值，能通过 `@cloudai-design/eslint-plugin`；
- 已覆盖当前模板适用任务中真实存在的关键状态与恢复路径，而不只展示 happy path，也不机械补齐不存在的 loading / empty / error；
- 响应式已在多个宽度下验证过，不是单张桌面截图；
- 收编时同步在选型表加一行「何时选它」，否则下游只能靠猜挑模板。
