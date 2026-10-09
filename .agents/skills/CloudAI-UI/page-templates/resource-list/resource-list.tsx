/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/resource-list.md，改之前先读它。
 * 填 SLOT 时对照同目录 resource-list.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 资源列表页的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - **工具栏、卡片网格、表格、分页、视图切换是同一个 `DataTablePro`。** 五个槽一个组件，
 *   不要自己排一遍工具栏，也不要为卡片视图另写一套搜索与筛选——切换视图只换呈现，
 *   搜索、筛选、页码都留着。
 * - **高度一行都不写。** 内容随行数/卡片数长，分页紧跟其后，页面底部允许留白。
 *   不撑满，也不给表格写死 `max-h`（PT-035 / DEC-105）。
 * - **内容里不许再开纵向滚动容器。** 唯一的主滚动容器是外壳的 `ContentArea`。
 * - **面包屑 `sticky top-0`**，底部带渐变遮罩；它要不透明底色，否则滚过去的内容会透出来。
 * - **概览区三块都是可选的**：`NoticeBar` 与 `MetricCards` 没有数据就整块不渲染，
 *   不要留空占位。两张稿的差别正是这个——卡片视图那张三块齐全，列表视图那张只有页头。
 * - **卡片高度由内容撑、同行等高**，描述超出截断。卡片不放操作按钮组，操作走右上角 `…`。
 *
 * 不可变量、插槽的允许放与空态、槽到组件的映射、响应式与滚动归属，全部逐条写在同目录的
 * `resource-list.md` 里。**照抄，不要重算。**
 */
export function ResourceList({
  view = "card",
  state = "ready",
  itemCount = 10,
  notice = true,
  metrics = true,
}: {
  /** 当前视图。两视图共用工具栏与筛选条件，由 `DataTablePro` 的 `showViewSwitch` 驱动。 */
  view?: "card" | "table"
  /** 内容区状态。三态都由 `DataTablePro` 自带，页面只负责接线，见 `resource-list.md`。 */
  state?: "ready" | "empty" | "loading"
  /** 卡片数 / 行数。默认 10，与分页的每页条数对齐——两者不一致时分页器在说另一件事。 */
  itemCount?: number
  /** 有没有通知条。没有就整块不渲染。 */
  notice?: boolean
  /** 有没有指标卡。没有就整块不渲染。 */
  metrics?: boolean
}) {
  return (
    // min-h-full 而不是 h-full：内容不足一屏时底部留白，超过一屏时顶开外壳的滚动容器。
    <div className="flex min-h-full flex-col">
      {/* SLOT:Breadcrumb —— 用 shadcn `Breadcrumb`：多级面包屑，单行。
          禁止放搜索框与操作按钮。sticky 在内容区顶部，不跟随滚动；
          底部那条渐变遮罩负责区分滚过去的内容。 */}
      <div
        data-slot="breadcrumb"
        className="sticky top-0 z-10 shrink-0 bg-background px-9 pt-5"
      >
        <SlotBox label="Breadcrumb" className="h-9 w-80 justify-start px-3" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-background to-transparent"
        />
      </div>

      {/* 正文：左右 36、上 16 下 36；概览组与列表区之间 48。 */}
      <div className="flex flex-col gap-12 px-9 pb-9 pt-4">
        <section className="flex flex-col gap-6">
          {/* SLOT:PageHeading —— 标题 24/32 + 可选副标题；右侧操作区放主次按钮与「更多」。
              禁止多段正文。**列表页的操作按钮放这里**，不要塞进工具栏。 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <SlotBox
                label="PageHeading"
                className="h-8 w-64 justify-start border-none px-0"
              />
              <SlotBox className="h-6 w-96 justify-start border-none px-0" />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <SlotBox className="size-8" />
              <SlotBox className="h-8 w-20" />
              <SlotBox className="h-8 w-20" />
            </div>
          </div>

          {/* SLOT:NoticeBar —— 可选。一条通知 + 至多两个行动链接，用 `MessageBar`。
              没有通知时整块不渲染，不要留空条。禁止放表单控件。 */}
          {notice ? (
            <SlotBox
              label="NoticeBar"
              className="h-12 w-full justify-start px-4"
            />
          ) : null}

          {/* SLOT:MetricCards —— 可选，2～4 张等宽卡，间距 12，用 `MetricCard`。
           **只读指标**：禁止放操作按钮与筛选。窄档换行。 */}
          {metrics ? (
            <div data-slot="metric-cards" className="flex flex-wrap gap-3">
              <SlotBox label="MetricCards" className="h-20 min-w-56 flex-1" />
              <SlotBox className="h-20 min-w-56 flex-1" />
              <SlotBox className="h-20 min-w-56 flex-1" />
              <SlotBox className="h-20 min-w-56 flex-1" />
            </div>
          ) : null}
        </section>

        <section
          data-slot="list-region"
          className="flex min-w-0 flex-col gap-3"
        >
          {/* SLOT:SectionLabel —— 分组标题单行（稿上是 `Workspace`）。
              禁止多级面包屑、操作按钮。 */}
          <SlotBox
            label="SectionLabel"
            className="h-5 w-24 justify-start border-none px-0"
          />

          {/* 下面五个槽是**同一个 `DataTablePro`**：`showViewSwitch` 出切换，`search` /
              `filter` 出工具栏，`cardView` 出卡片网格，`columns` / `data` 出表格，
              `pagination` 出分页。占位块只是让你看见尺寸与间距，抄改时整块换成组件。 */}
          <ListBlock view={view} state={state} itemCount={itemCount} />
        </section>
      </div>
    </div>
  )
}

/**
 * 列表块：工具栏、内容、分页依次排下来，间距 16（`DataTablePro` 自带的 `gap-4`）。
 * **没有任何一层写高度**——内容多高由条数决定，分页就跟在它下面。
 */
function ListBlock({
  view,
  state,
  itemCount,
}: {
  view: "card" | "table"
  state: "ready" | "empty" | "loading"
  itemCount: number
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* SLOT:SearchFilterToolbar —— 搜索框 + `FilterGroupV2` 在左，排序与刷新在右，高 32。
          筛选不要自己搓下拉，高级筛选走弹层，不在行内展开。
          `FilterGroupV2` 的 `showKeys` **起手给空数组**：先出「筛选」入口，点一次展开前三项，
          右侧「+」再加剩下的。筛选项字典要多于 3 项，否则「+」不渲染。 */}
      <div
        data-slot="search-filter-toolbar"
        className="flex flex-wrap items-start justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <SlotBox label="SearchFilterToolbar" className="h-8 w-56" />
          <SlotBox className="h-8 w-20" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SlotBox className="h-8 w-24" />
          <SlotBox className="size-8" />
          {/* SLOT:ViewSwitchTabBar —— 卡片 / 列表两档，**在工具栏最右**。
              禁止超过 3 档；切换只改呈现，不清空搜索与筛选。 */}
          <SlotBox label="◫" className="h-8 w-[3.75rem] shrink-0" />
        </div>
      </div>

      <ListContent view={view} state={state} itemCount={itemCount} />

      {/* SLOT:Pagination —— 页码 + 前后翻页，右对齐，**紧跟内容**。
          不要把它推到页面底部；空态时隐藏。 */}
      {state === "empty" ? null : (
        <div data-slot="pagination" className="flex justify-end">
          <SlotBox label="Pagination" className="h-8 w-64" />
        </div>
      )}
    </div>
  )
}

/**
 * 内容区。**空态与加载态发生在这一层内部**，不顶掉页头、指标区和工具栏——
 * 整页级的空白页会把用户选好的筛选条件一起抹掉。
 */
function ListContent({
  view,
  state,
  itemCount,
}: {
  view: "card" | "table"
  state: "ready" | "empty" | "loading"
  itemCount: number
}) {
  if (state === "empty") {
    return (
      <Placeholder text="空态：插画 + 暂无数据 + 创建按钮，落在内容区内部" />
    )
  }
  if (state === "loading") {
    return <Placeholder text="加载态：卡片骨架或表格骨架，保持当前视图的网格" />
  }
  if (view === "card") {
    return <CardGrid itemCount={itemCount} />
  }
  return <TableView itemCount={itemCount} />
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
      {text}
    </div>
  )
}

/**
 * 卡片网格。抄改时用 `DataTablePro` 的 `cardGrid` 传入 `ResourceCardGrid`，
 * 列数跟它的默认：`1 / sm:2 / lg:3 / xl:4`，最多四列。不要用 DataTablePro 内置那套恒 3 列。
 */
function CardGrid({ itemCount }: { itemCount: number }) {
  return (
    <div
      data-slot="card-grid"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {/* SLOT:CardGrid —— N 张 Card。禁止挂纵向滚动；空态在网格内居中，不顶掉工具栏。 */}
      {Array.from({ length: itemCount }, (_, index) => (
        <Card key={index} first={index === 0} />
      ))}
    </div>
  )
}

/**
 * 卡片：整张是 `ResourceCard`，内边距 16、块间 12、圆角 12，hover 描边转品牌色。
 * 这里的占位块照它的排布摆——标题行、描述、内容区、底部信息排——**不要给卡片写高度**：
 * 稿上 140 的卡高由 `contentHeight` 撑出来，同行等高由网格拉伸保证。
 *
 * **不要往外套 `HoverCard`。** 卡片自己的 hover 态已经占了这个手势，补充字段进详情页（PT-036）。
 */
function Card({ first }: { first: boolean }) {
  return (
    <div
      data-slot="card"
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 hover:border-brand"
    >
      {/* SLOT:Card —— 用 `ResourceCard`：`title` + `titleAction`（编辑 **按钮**）+ `actions`
          （`DropdownMenu`，触发器是 `…`）+ `description`（两行截断）+ `footer`
          （行内两项 + 其余收进 `CollapsedInfo`，触发器是组件自带的文档按钮）。
          溢出项靠 `maxInlineCount` / 宽度收起，**不要自己再塞一个 FileText 当收起入口**。
          `titleAction` / `actions` 必须是可点控件，不能只塞图标。
          禁止手搓卡片，也禁止放详细配置与操作按钮组：卡片是入口，操作走右上角 `…`。 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <SlotBox
            label={first ? "Card" : undefined}
            className="h-5 w-32 justify-start border-none px-0"
          />
          <SlotBox className="h-4 w-10 border-none" />
        </div>
        <SlotBox className="h-4 w-full justify-start border-none px-0" />
      </div>
      {/* `contentHeight` 撑出来的内容区：这一页没有图表，只用它把底部信息压到卡片下沿。 */}
      <div className="h-6" />
      <div className="flex items-center gap-2">
        <SlotBox className="h-5 w-16 rounded-xl" />
        <SlotBox className="h-4 w-20 border-none" />
      </div>
    </div>
  )
}

/**
 * 表格视图。表头 36、行高 52，外框圆角 8 + 中性描边。
 * **不挂 `overflow-y`**：跟着内容区一起滚。
 */
function TableView({ itemCount }: { itemCount: number }) {
  return (
    <div
      data-slot="table-view"
      className="flex flex-col overflow-hidden rounded-lg border border-border"
    >
      {/* SLOT:TableView —— 表头 + N 行 `Row`。禁止内联编辑、展开行，禁止挂纵向滚动。 */}
      <div className="flex h-9 items-center border-b border-border bg-muted/40 px-4 text-xs text-muted-foreground">
        TableView 表头（36）
      </div>
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          data-slot="row"
          className="flex h-[3.25rem] items-center gap-4 border-b border-border px-4 last:border-b-0"
        >
          {/* SLOT:Row —— 名称 + 状态 + 业务自定列 + 操作列；行高 52。
              整行可点进详情，操作列只放图标按钮。 */}
          <SlotBox
            label={index === 0 ? "Row" : undefined}
            className="h-5 flex-1 border-none px-0"
          />
        </div>
      ))}
    </div>
  )
}

/**
 * 插槽占位。**抄改时连这个组件一起删掉**，换成真实内容——它只是让骨架在 Storybook
 * 里看得见边界与尺寸约束。
 */
function SlotBox({
  label,
  className,
  children,
}: {
  label?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground",
        className,
      )}
    >
      {children ?? label}
    </div>
  )
}
