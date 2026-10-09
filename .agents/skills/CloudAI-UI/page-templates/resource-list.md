# ResourceList 资源列表

**何时选它**：用户要在**一批同类对象**里找到某一个，然后操作它——表里一行点开就是那个对象的详情
页，它有自己的名字、状态与生命周期，能改名、能删除。卡片与表格两种呈现随用户切换。

**试用场景**：工作空间列表、知识库文件列表、Agent 列表、数据源列表、模型列表。模板不锁对象——列名
与卡片字段都由业务定，顶部概览指标也是可选的（删掉页面照样成立）。

**表里一行是只读流水**（用量、调用、巡检结果）时不是这一页，回 `SKILL.md` 的选型表重选。

**先抄 [AppShell](app-shell.md)**，本模板只是它 `SLOT:PageContent` 里的内容子树，不含顶栏与侧栏。

**抄 [`resource-list.tsx`](page-templates/resource-list/resource-list.tsx)，看
[`resource-list.reference.tsx`](page-templates/resource-list/resource-list.reference.tsx)。**
把骨架复制进你的页面，按还原件填 `SLOT:`。**不要 `import`，也不要整页抄还原件。**

下面这些是契约，照抄，不要凭手感重算。

## 结构

```txt
模板根（min-h-full flex-col）
├── Breadcrumb（sticky top-0，不透明底 + 底部渐变遮罩）
└── 正文（左右 36，上 16 下 36，两块之间 48）
    ├── 概览组（块间 24）
    │   ├── PageHeading   标题 + 可选副标题 + 右侧操作区
    │   ├── NoticeBar     可选
    │   └── MetricCards   可选，2～4 张，间距 12
    └── 列表区（块间 12）
        ├── SectionLabel          可选
        ├── SearchFilterToolbar   ┐
        ├── ViewSwitchTabBar      │
        ├── CardGrid / TableView  ├─ 这五块是同一个 DataTablePro
        │   └── Card / Row        │
        └── Pagination            ┘
```

**概览区那三块都是可选的**，稿上两张图的差别就是它们的有无：`Workspace 列表` 三块齐全，
`Erin's knowledge base` 只有页头。**没有数据就整块不渲染**，不要留一条空通知或四张空卡。

## 五个槽是同一个组件

工具栏、视图切换、卡片网格、表格、分页全部由 `DataTablePro` 渲染，**不要自己排一遍**：

```tsx
<DataTablePro
  columns={columns}
  data={rows}
  getRowId={(row) => row.id}
  showColumnSettings={false}
  showViewSwitch
  defaultView="card" // 不传默认 "list"
  cardView={(item) => <ResourceCard item={item} />}
  cardGrid={(cards) => <ResourceCardGrid gap={4}>{cards}</ResourceCardGrid>}
  search={<Input placeholder="搜索..." className="h-8 w-56" />}
  filter={<FilterGroupV2 {...filterProps} />}
  onRefresh={reload} // 重新拉数据，怎么拉归你
  pagination={{
    variant: 'normal',
    total,
    current: page,
    pageSize, // 默认 20；这一页真的渲染几条就写几，别让分页器说另一件事
    onChange: setPage,
  }}
/>
```

**切换视图只改呈现**：搜索、筛选、页码都由组件保留，页面不用自己存一份。

**`defaultView` 按这一页的对象长什么样定**，别一律给 `card`：

| 默认给   | 什么时候                                                 | 例                      |
| -------- | -------------------------------------------------------- | ----------------------- |
| `"card"` | 对象不多，用户靠名字认人，每张卡挂一个状态与一两个关键值 | 工作空间、Agent、数据源 |
| `"list"` | 字段多（≥5 列），用户要横向比对、排序、批量选            | 知识库文件、任务、成员  |

**高度相关的 prop 一个都不传。** 内容随条数长、分页紧跟其后、**页面底部允许留白**，这是
`DataTablePro` 的默认行为，也是本模板要的（PT-035 / DEC-105）。不要写 `h-full` / `flex-1`，也不要在
`scrollContainerClassName` 上写死 `max-h-[560px]`：宽屏下留白、矮屏下分页被顶出视口。

## 每个槽都有现成组件，一个都别手搓

| 槽                   | 用这个组件                       | 备注                                                   |
| -------------------- | -------------------------------- | ------------------------------------------------------ |
| `Breadcrumb`         | shadcn `Breadcrumb`              | `npx shadcn@3 add breadcrumb`；末级用 `BreadcrumbPage` |
| `NoticeBar`          | `MessageBar`                     | 四个风险档；行动链接用 `MessageBarAction`              |
| `MetricCards`        | `MetricCard`                     | 只读指标；进度用 `ProgressPro`，趋势用 `ChartPro`      |
| 工具栏 / 切换 / 列表 | `DataTablePro`                   | **一个组件盖五槽**，见上                               |
| `CardGrid`           | `ResourceCardGrid`（`cardGrid`） | 默认 `1 / sm:2 / lg:3 / xl:4`，最多四列                |
| `Card`               | `ResourceCard`                   | 整张卡是它，**禁止手搓**，见下                         |
| 筛选                 | `FilterGroupV2`（`filter` 槽）   | `showKeys` **起手给空数组**，见下                      |
| 搜索                 | `Input`，`className="h-8 w-56"`  | 与工具栏其它控件对齐                                   |
| 状态标签             | `StatusBadge`                    | 六档语义色，别自己配颜色                               |
| 页头按钮             | `Button`                         | 主次各一 + 一个「更多」图标按钮                        |

**卡片整张是 `ResourceCard`。** 标题、紧贴标题的编辑图标、右上 `…`、两行截断的描述、底部一排信息与
窄容器下的溢出收起，全部是它的 props：

```tsx
<ResourceCard
  title={item.name}
  titleAction={
    <Button variant="ghost" size="icon" className="size-6" aria-label="编辑">
      <Pencil className="size-3.5" />
    </Button>
  }
  actions={<CardActionsMenu />} // DropdownMenu，触发器是「…」按钮；别只塞图标
  description={item.description}
  contentHeight={24} // 稿上 140 的卡高靠它撑，别给卡片写死高度
  collapsedTitle="实例信息"
  footer={[
    {
      key: 'status',
      label: '状态',
      content: <StatusBadge status={item.tone}>{item.status}</StatusBadge>,
    },
    { key: 'region', label: '地域', content: item.region },
    { key: 'uid', label: 'UID', content: item.uid },
    { key: 'created', label: '创建时间', content: item.createdAt },
  ]}
/>
```

**`titleAction` / `actions` 必须是可点控件。** 组件只负责占位，不会把你塞进去的节点包成按钮。
只传 `<Pencil />` / `<MoreHorizontal />` 看起来像操作，点下去什么都不会发生。

**footer 溢出不要自己塞图标，也不要写 `maxInlineCount`。** 宽度够就全展示，不够才出
`CollapsedInfo`。再塞一个 `<FileText />` 当第三项，看起来像收起入口，点下去什么都没有。

**网格用 `cardGrid` 传入 `ResourceCardGrid`**，列数跟组件默认：`1 / sm:2 / lg:3 / xl:4`，最多四列。
不要传 `columns` 卡成两列，也不要用 DataTablePro 内置那套恒 3 列，更不要在每张卡外套一层网格。

**不要再往 `ResourceCard` 外套 `HoverCard`。** 卡片自己的 hover 态（描边转品牌色、编辑图标与 `…`
浮现）已经占用这个手势；稿上那块补充信息浮层不实现，字段进详情页。

**`FilterGroupV2` 的 `showKeys` 起手给空数组。** 三段式是 `[]` →「筛选」入口 → 点一次展开前三项，
筛选项多于 3 个时右侧还有「+」继续加。**一开始就把 key 填上**等于直接跳到第三段：入口看不到，而
字典项数没超过 3 时连「+」也不出，剩下的筛选项点不到。中文页面记得传 `filterLabel="筛选"`，
组件默认文案是英文 `Filter`。

## 不可变量

| 量                 | 值                                                   |
| ------------------ | ---------------------------------------------------- |
| 内容左右内边距     | 36（`px-9`），型 ② 全宽数据型                        |
| 面包屑行           | 上 20（`pt-5`），`sticky top-0`，底部 16 的渐变遮罩  |
| 正文上下           | 上 16（`pt-4`）、下 36（`pb-9`）                     |
| 概览组 ↔ 列表区    | 48（`gap-12`）                                       |
| 概览组内部         | 24（`gap-6`）                                        |
| `MetricCards` 间距 | 12（`gap-3`），2～4 张等宽，窄档换行                 |
| 列表区内部         | 12（`gap-3`）：分组标题与列表块之间                  |
| 列表块内部         | 16（`gap-4`），`DataTablePro` 自带                   |
| `Card`             | `ResourceCard` 的既定值：内边距 16、块间 12、圆角 12 |
| `Card` 卡高        | 内容决定；稿上的 140 用 `contentHeight={24}` 撑      |
| 表头高             | 36（`h-9`）                                          |
| 行高               | 52（`h-[3.25rem]`）                                  |
| 每页条数           | 10：`pageSize` 与这一页渲染的条数必须一致            |

**这张表里没有任何高度上限**，这是故意的，见上面「高度相关的 prop 一个都不传」。**卡片也不写高度**：
同一行等高由网格拉伸保证，写死高度反而会在描述换行时截断内容。

**正文撑满内容区，不限宽也不居中。** 超宽档下网格与表格跟着内容区一起拉宽。

## 插槽

| 插槽                  | 允许放                                     | 禁止放                                             | 空态                       |
| --------------------- | ------------------------------------------ | -------------------------------------------------- | -------------------------- |
| `Breadcrumb`          | 多级面包屑导航，单行                       | 搜索框、操作按钮                                   | 顶层页面时整行不渲染       |
| `PageHeading`         | 可选图标 + 标题 + 可选副标题 + 右侧操作区  | 多段正文                                           | 不允许为空                 |
| `NoticeBar`           | 一条通知 + 至多两个行动链接                | 表单控件、可关闭以外的交互                         | 无通知时整块不渲染         |
| `MetricCards`         | 2～4 张只读指标卡：数值 + 进度或趋势       | 操作按钮、筛选                                     | 无指标时整块不渲染         |
| `SectionLabel`        | 分组标题，单行                             | 多级面包屑、操作按钮                               | 不分组时整行不渲染         |
| `ViewSwitchTabBar`    | 卡片 / 列表两档                            | 超过 3 档                                          | 只有一种呈现时不渲染       |
| `SearchFilterToolbar` | 搜索输入框 + 筛选 + 可选排序，右侧刷新     | 行内展开的高级筛选面板                             | 不允许为空                 |
| `CardGrid`            | N 张 `Card`                                | 纵向内滚                                           | 网格内居中空态，见「状态」 |
| `Card`                | 图标 + 名称 + 状态 + 一行描述 + 一条元信息 | 详细配置、操作按钮组、手搓的卡壳、外套 `HoverCard` | 不允许为空                 |
| `TableView`           | 表头 + N 行 `Row`                          | 内联编辑、展开行、纵向内滚                         | 表体内居中提示             |
| `Row`                 | 名称 + 状态 + 业务自定列 + 操作列          | 超过一行的单元格内容                               | 不允许为空                 |
| `Pagination`          | 页码 + 前后翻页                            | 批量操作（那是 `batchActions`）                    | 空态时隐藏                 |

**卡片上不放操作按钮组。** 补充字段进详情页，操作走右上角 `…`——卡片是入口不是控制台。
**同一行卡片等高**，描述超出截断，别让某张卡把整行撑高。

## 状态

| 状态        | 表现                                                           | 怎么接                        |
| ----------- | -------------------------------------------------------------- | ----------------------------- |
| 空          | 内容区内居中插画 +「暂无数据」+ 创建按钮，**分页隐藏**         | `emptyState`                  |
| 搜索无结果  | 同上，但文案是「未找到匹配项」+ 清除筛选按钮                   | `emptyState` 按有无筛选条件切 |
| 首次加载    | 骨架，**保持当前视图**：卡片视图给卡片骨架，列表视图给表格骨架 | `loading`                     |
| 筛选 / 翻页 | 半透明蒙层 + loading，**保留旧数据**不闪空                     | `refreshLoading`，别清空 data |
| 卡片 hover  | 描边转品牌色，编辑图标与 `…` 浮现                              | `ResourceCard` 自带           |
| 行 hover    | 行背景高亮                                                     | `DataTable` 自带              |

**空态发生在内容区内部，不是整页。** 整页级的空白页会把用户已经选好的筛选条件一起抹掉，他就没法回退。

**加载骨架要跟着当前视图走。** 卡片视图给表格骨架，切回来会跳一次布局。

## 响应式

| 区域          | Compact ≤1280          | Standard 1440 | Wide ≥1920           |
| ------------- | ---------------------- | ------------- | -------------------- |
| 内容区        | 全宽 − 左右 36         | 1160，左右 36 | 跟随外壳撑满，不限宽 |
| `MetricCards` | 换行                   | 横排 2～4 张  | 跟随内容区拉宽       |
| `CardGrid`    | 4 列                   | 4 列          | 4 列                 |
| `TableView`   | 列宽按比例压缩，可横滚 | 全宽铺满      | 跟随内容区拉宽       |

**卡片网格走 `ResourceCardGrid` 的默认列数**，目标范围内（≥1280）是 **4 列**。列数由组件断点决定，
不是 DataTablePro 内置那套恒 3 列。footer 有没有收起只看单卡宽度，不要写 `maxInlineCount`。

**纵向归属三档不变**，变的只有宽度。侧栏自动收起阈值 1440，由外壳负责。

## 滚动归属

| 层              | 行为                                                   |
| --------------- | ------------------------------------------------------ |
| 整页            | 不滚                                                   |
| `ContentArea`   | **唯一的主滚动容器**（在 `AppShell` 里，本模板不再挂） |
| `Breadcrumb`    | `sticky top-0`，不跟随滚动                             |
| 概览组          | 跟着 `ContentArea` 滚                                  |
| 卡片网格 / 表格 | 跟着 `ContentArea` 滚，**不纵向内滚**                  |
| `Pagination`    | 紧跟内容一起滚，不钉在视口底                           |

**内容里不许再开纵向滚动容器。** 两条滚动条时，用户的滚轮落在哪里取决于指针位置。

**面包屑要不透明底色。** 它 `sticky` 在滚动内容之上，底色透明的话卡片会从下面透出来。

## 增强项

- **概览区三块可选**，没有数据就整块不渲染，不要留空占位。
- **切换视图只改呈现**，搜索、筛选、页码都保留。
- **卡片不放操作按钮组**：补充字段进详情页，操作走右上角 `…`。不要外套 `HoverCard`。
- **卡片、筛选条、分页都用现成组件**：`ResourceCard` / `FilterGroupV2` / `DataTablePro` 的 `pagination`，
  手搓一份就会与列表页的其它页漂开。
- **同一行卡片等高**，描述超两行截断。
- **空态出现在内容区内部**，不顶掉页头、指标区和工具栏。
- 稿上的样本（`Erin's Workspace`、知识库文件、`主要按钮` / `次要按钮`）都是占位内容，换掉；
  卡高 140、行高 52 与各处间距留下。
