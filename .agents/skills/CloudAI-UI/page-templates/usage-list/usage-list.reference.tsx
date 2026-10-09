/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 usage-list.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import type { ColumnDef } from "@tanstack/react-table"
import * as React from "react"
import { Bar, BarChart, XAxis } from "recharts"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChartContainer } from "@/components/ui/chart-pro"
import { DataTablePro } from "@/components/ui/data-table-pro"
import type {
  FilterBoxConfigV2,
  FiltersV2,
} from "@/components/ui/filter-group-v2"
import { FilterGroupV2 } from "@/components/ui/filter-group-v2"
import { Input } from "@/components/ui/input"
import { ProgressPro } from "@/components/ui/progress-pro"
import { StatusBadge } from "@/components/ui/status-badge"

/**
 * 用量列表的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `usage-list.tsx`。对照 `Credit用量概览 / Sidebar-Open`。
 *
 * 这份还原件的主要作用是示范**每个槽该用哪个现成组件**，一个都不手搓：
 * 面包屑 shadcn `Breadcrumb`、筛选 `FilterGroupV2`、工具栏 + 表格 + 分页一个
 * `DataTablePro`、结果标签 `StatusBadge`、进度 `ProgressPro`、趋势图 `ChartPro`。
 *
 * `DataTablePro` 这里**不传任何高度相关的 prop**：默认就是内容流式——表格多高由行数
 * 决定，分页紧跟其后，页面底部允许留白（DEC-105）。
 *
 * 巡检样本、Credit 数值都是稿上的占位内容，换掉；层级与间距留下。
 */
export function UsageListReference() {
  const [page, setPage] = React.useState(1)
  const [showKeys, setShowKeys] = React.useState<string[]>([])
  const [filters, setFilters] = React.useState<FiltersV2>({})

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 shrink-0 bg-background px-9 pt-5">
        <Breadcrumb className="flex h-9 items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">控制台</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">费用中心</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Credit 用量</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-background to-transparent"
        />
      </div>

      <div className="flex flex-col gap-6 px-9 pb-9 pt-4">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Credit 用量概览
            </h1>
            <p className="text-base text-muted-foreground">
              查看您的 Credit 消耗明细与剩余额度
            </p>
          </div>

          {/* 一张概览卡、内部两栏，栏间 32。只读，不放操作按钮与筛选。 */}
          <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-border bg-card p-4">
            <UsageColumn />
            <TrendColumn />
          </div>
        </section>

        <section className="flex min-w-0 flex-col gap-4">
          <h2 className="text-sm font-medium">Workspace</h2>

          {/* 工具栏 + 表格 + 分页都在这一个组件里，且不传高度：默认内容流式。 */}
          <DataTablePro
            columns={COLUMNS}
            data={ROWS}
            getRowId={(row) => row.instanceId}
            showColumnSettings={false}
            search={<Input placeholder="搜索..." className="h-8 w-56" />}
            filter={
              <FilterGroupV2
                allFilters={FILTERS}
                showKeys={showKeys}
                onShowKeysChange={setShowKeys}
                filters={filters}
                onChange={setFilters}
              />
            }
            onRefresh={() => undefined}
            pagination={{
              variant: "normal",
              total: 96,
              current: page,
              onChange: setPage,
            }}
          />
        </section>
      </div>
    </div>
  )
}

/** 概览卡左栏：额度用量 + 进度条 + 脚注。 */
function UsageColumn() {
  return (
    <div className="flex min-w-64 flex-1 flex-col gap-2">
      <p className="text-sm text-muted-foreground">用量</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums">138.45</span>
        <span className="text-sm text-muted-foreground">剩余额度</span>
      </div>
      <ProgressPro value={35} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>15,806 / 46,000（已使用 35%）</span>
        <span>将于 2026年10月23日 刷新</span>
      </div>
    </div>
  )
}

/** 概览卡右栏：趋势图。**图表只是示意**，不规定图表库与柱子数量。 */
function TrendColumn() {
  return (
    <div className="flex min-w-64 flex-1 flex-col gap-2">
      <p className="text-sm text-muted-foreground">趋势</p>
      <ChartContainer config={TREND_CONFIG} className="h-20 w-full">
        <BarChart data={TREND_DATA} accessibilityLayer>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            interval="preserveStartEnd"
            className="text-xs"
          />
          <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={2} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

interface InspectionRow {
  instanceId: string
  link: string
  item: string
  result: "异常" | "风险" | "正常"
  advice: string
}

const RESULT_STATUS = {
  异常: "warning-high",
  风险: "warning-medium",
  正常: "success",
} as const

const COLUMNS: Array<ColumnDef<InspectionRow>> = [
  { accessorKey: "instanceId", header: "实例ID", size: 140 },
  { accessorKey: "link", header: "链路名称", size: 220 },
  { accessorKey: "item", header: "巡检项", size: 180 },
  {
    accessorKey: "result",
    header: "结果",
    size: 100,
    cell: ({ row }) => (
      <StatusBadge status={RESULT_STATUS[row.original.result]}>
        {row.original.result}
      </StatusBadge>
    ),
  },
  { accessorKey: "advice", header: "建议", size: 300 },
]

/** 筛选项配置交给 `FilterGroupV2`：pill、多选、日期与「+」加筛选项都由它管。 */
const FILTERS: Record<string, FilterBoxConfigV2> = {
  result: {
    title: "结果",
    selectMode: "multiple",
    dataSource: [
      { label: "异常", value: "high" },
      { label: "风险", value: "medium" },
      { label: "正常", value: "normal" },
    ],
  },
  item: {
    title: "巡检项",
    selectMode: "multiple",
    dataSource: [
      { label: "延迟", value: "latency" },
      { label: "连通性", value: "connectivity" },
      { label: "规格", value: "spec" },
    ],
  },
  checkedAt: { title: "巡检时间", type: "dateRange" },
}

const ROWS: InspectionRow[] = [
  {
    instanceId: "dts-xxxx-001",
    link: "MySQL → RDS 同步",
    item: "延迟 / 连通性 / 规格",
    result: "异常",
    advice: "Writer OOM，建议重启",
  },
  {
    instanceId: "dts-xxxx-002",
    link: "Oracle → PolarDB 迁移",
    item: "延迟 / 数据一致性",
    result: "风险",
    advice: "延迟 32min，源库负载高",
  },
  {
    instanceId: "dts-xxxx-003",
    link: "PostgreSQL → ADB 同步",
    item: "连通性 / 白名单",
    result: "异常",
    advice: "目标库连接失败",
  },
  {
    instanceId: "dts-xxxx-004",
    link: "MySQL → Kafka 订阅",
    item: "规格 / 吞吐",
    result: "风险",
    advice: "RPS 接近规格上限",
  },
  {
    instanceId: "dts-xxxx-005",
    link: "SQL Server → RDS 同步",
    item: "全量 / 增量",
    result: "正常",
    advice: "-",
  },
  {
    instanceId: "dts-xxxx-006",
    link: "MongoDB → DocumentDB",
    item: "连通性 / 配置",
    result: "正常",
    advice: "-",
  },
]

const TREND_CONFIG = {
  value: { label: "用量", color: "hsl(var(--chart-1))" },
}

const TREND_DATA = Array.from({ length: 30 }, (_, index) => ({
  day: `${4 + Math.floor(index / 10)} / ${(index % 10) + 1}`,
  value: 20 + ((index * 37) % 60),
}))
