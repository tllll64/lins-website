/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/usage-list.md，改之前先读它。
 * 填 SLOT 时对照同目录 usage-list.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 用量列表的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - **表格高度随行数，不撑满。** 分页紧跟表格下方，**页面底部允许留白**。
 *   别为了把分页钉在底部去写 `h-full` / `flex-1`：行少于一屏时那样会在表格与分页之间
 *   拉出一大片空白，为了钉住分页反而把内容中间断开了（DEC-105）。
 * - **更不要给表格写死高度。** `max-h-[560px]` 这类值宽屏下留白、矮屏下把分页顶出视口。
 *   两边都不写高度：组件默认的内容流式就是对的。
 * - **内容里不许再开滚动容器。** 唯一的主滚动容器是外壳的 `ContentArea`；表格跟着它滚，
 *   不自己内滚。（表格那层为了横向滚动本来就带 `overflow`，所以表头 `sticky` 在这套
 *   布局下不生效，也不要为了让它生效去改高度。）
 * - **面包屑 `sticky top-0`**，底部带渐变遮罩盖住滚过去的内容；它要不透明底色，
 *   否则滚动的表格会从下面透出来。
 * - **该复用的都有现成组件**：面包屑用 shadcn `Breadcrumb`，筛选用 `FilterGroupV2`，
 *   工具栏 + 表格 + 分页三块是一个 `DataTablePro`，状态标签用 `StatusBadge`。
 *   哪个槽配哪个组件见 `usage-list.md`，不要在页面里手搓。
 *
 * 不可变量、插槽的允许放与空态、槽到组件的映射、响应式与滚动归属，全部逐条写在同目录的
 * `usage-list.md` 里。**照抄，不要重算。**
 */
export function UsageList({
  rowCount = 8,
  tableState = "ready",
}: {
  /** 表体行数。只影响占位观感；行高 52 是契约。 */
  rowCount?: number
  /** 表格区状态。四态都由 `DataTablePro` 自带，页面只负责接线，见 `usage-list.md`。 */
  tableState?: "ready" | "empty" | "loading"
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

      {/* 正文：上 16 下 36，左右 36；概览组与表格区之间 24。 */}
      <div className="flex flex-col gap-6 px-9 pb-9 pt-4">
        <section className="flex flex-col gap-6">
          {/* SLOT:PageHeading —— 标题 24/32 + 可选副标题；右侧可放操作区。
              禁止多段正文。 */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <SlotBox
                label="PageHeading"
                className="h-8 w-64 justify-start border-none px-0"
              />
              <SlotBox className="h-6 w-96 justify-start border-none px-0" />
            </div>
            <SlotBox className="h-9 w-24 shrink-0" />
          </div>

          {/* SLOT:SummaryCard —— 一张概览卡，内部 2～N 栏、栏间 32。
              **只读指标**：禁止放操作按钮与筛选。栏在窄档换行。
              趋势图用 `ChartPro`，只是示意，不规定图表库与柱子数量。 */}
          <div
            data-slot="summary-card"
            className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-4"
          >
            <SlotBox label="SummaryCard" className="h-20 min-w-64 flex-1" />
            <SlotBox className="h-20 min-w-64 flex-1" />
          </div>
        </section>

        <section
          data-slot="table-region"
          className="flex min-w-0 flex-col gap-4"
        >
          {/* SLOT:SectionLabel —— 分组标题单行（稿上是 `Workspace`）。
              禁止多级面包屑、操作按钮。 */}
          <SlotBox
            label="SectionLabel"
            className="h-6 w-32 justify-start border-none px-0"
          />

          {/* 下面三个槽是**同一个 `DataTablePro`**：它的根布局就是「工具栏 → 表格 →
              右下分页」、间距 16，与稿面逐项吻合，而且默认就是内容流式，不用传任何
              高度相关的 prop（DEC-105）。占位块只是让你看见行高与间距，抄改时整块换成组件。 */}
          <TableBlock rowCount={rowCount} tableState={tableState} />
        </section>
      </div>
    </div>
  )
}

/**
 * 表格块：工具栏、表格、分页依次排下来，间距 16（`DataTablePro` 自带的 `gap-4`）。
 * **没有任何一层写高度**——表格多高由行数决定，分页就跟在它下面。
 */
function TableBlock({
  rowCount,
  tableState,
}: {
  rowCount: number
  tableState: "ready" | "empty" | "loading"
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* SLOT:SearchFilterToolbar —— 搜索框 + `FilterGroupV2` 在左，刷新在右，高 40。
          筛选不要自己搓下拉：`FilterGroupV2` 管了 pill、多选、日期与「+」加筛选项。 */}
      <div
        data-slot="search-filter-toolbar"
        className="flex h-10 items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <SlotBox label="SearchFilterToolbar" className="h-8 w-56" />
          <SlotBox className="h-8 w-20" />
        </div>
        <SlotBox className="size-8" />
      </div>

      {/* SLOT:UsageTable —— 外框圆角 8 + 中性描边。表头 36，行高 52。
          禁止内联编辑与展开行，也禁止在这一层挂 `overflow-y`。 */}
      <div
        data-slot="usage-table"
        className="flex flex-col overflow-hidden rounded-lg border border-border"
      >
        <div className="flex h-9 items-center border-b border-border bg-muted/40 px-4 text-xs text-muted-foreground">
          UsageTable 表头（36）
        </div>

        {tableState === "ready" ? (
          Array.from({ length: rowCount }, (_, index) => (
            <div
              key={index}
              data-slot="usage-row"
              className="flex h-[3.25rem] items-center gap-4 border-b border-border px-4 last:border-b-0"
            >
              {/* SLOT:UsageRow —— 行高 52，列由业务定；状态标签用 `StatusBadge` 的三档
                  语义色：异常 / 风险 / 正常，不要自己配颜色，也不要加第四种。 */}
              <SlotBox
                label={index === 0 ? "UsageRow" : undefined}
                className="h-5 flex-1 border-none px-0"
              />
            </div>
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-xs text-muted-foreground">
            {tableState === "empty" ? "空态：暂无记录" : "加载态：表格骨架"}
          </div>
        )}
      </div>

      {/* SLOT:Pagination —— 页码 + 前后翻页，右对齐，**紧跟表格**。
          不要把它推到页面底部；空态时隐藏。 */}
      {tableState === "empty" ? null : (
        <div data-slot="pagination" className="flex justify-end">
          <SlotBox label="Pagination" className="h-8 w-64" />
        </div>
      )}
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
