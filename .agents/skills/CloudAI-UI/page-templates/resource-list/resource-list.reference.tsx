/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 resource-list.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import * as React from "react"
import { Area, AreaChart } from "recharts"

import { ChartContainer } from "@/components/ui/chart-pro"
import { DataTablePro } from "@/components/ui/data-table-pro"
import type {
  FilterBoxConfigV2,
  FiltersV2,
} from "@/components/ui/filter-group-v2"
import { FilterGroupV2 } from "@/components/ui/filter-group-v2"
import {
  MessageBar,
  MessageBarAction,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from "@/components/ui/message-bar"
import {
  MetricCard,
  MetricCardLabel,
  MetricCardTitle,
} from "@/components/ui/metric-card"
import { ProgressPro } from "@/components/ui/progress-pro"
import { ResourceCard, ResourceCardGrid } from "@/components/ui/resource-card"
import type { StatusBadgeStatus } from "@/components/ui/status-badge"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

/**
 * 资源列表页的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `resource-list.tsx`。
 *
 * 稿有两张，`board` 对应哪一张：`card` 是 `Workspace 列表`（页头 + 通知条 + 指标卡齐全，
 * 默认卡片视图），`table` 是 `Erin's knowledge base`（只有页头，默认列表视图）。
 * 两张的差别就是概览区那三块的有无——**它们都是可选槽**。
 *
 * 工具栏、视图切换、卡片网格、表格、分页是**同一个 `DataTablePro`**，一个 prop 都不用写高度：
 * 默认就是内容流式（PT-035 / DEC-105）。切换视图时搜索与筛选条件不清空，这也是它自带的。
 *
 * 样本数据是稿上的占位内容，换掉；层级、间距与卡片尺寸留下。
 */
export function ResourceListReference({
  board = "card",
}: {
  board?: "card" | "table"
}) {
  const [page, setPage] = React.useState(1)
  // 筛选条起手是**空数组**：先出「筛选」入口，点一次展开前三项，右侧的「+」再加剩下的。
  // 一开始就把 key 填上会直接跳到第三段，入口与「+」都看不到。
  const [showKeys, setShowKeys] = React.useState<string[]>([])
  const [filters, setFilters] = React.useState<FiltersV2>({})

  const preset = board === "card" ? WORKSPACE_BOARD : KNOWLEDGE_BOARD

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
              <BreadcrumbLink href="#">{preset.parent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{preset.crumb}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-background to-transparent"
        />
      </div>

      <div className="flex flex-col gap-12 px-9 pb-9 pt-4">
        <section className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {preset.icon ? (
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
                  <FileText className="size-5" />
                </span>
              ) : null}
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {preset.title}
                </h1>
                <p className="text-base text-muted-foreground">
                  {preset.subtitle}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
              <Button variant="outline" size="sm">
                次要按钮
              </Button>
              <Button size="sm">主要按钮</Button>
            </div>
          </div>

          {/* 通知条与指标卡都是可选的：列表视图那张稿两块都没有，就整块不渲染。 */}
          {preset.notice ? (
            <MessageBar>
              <MessageBarBody>
                <MessageBarTitle>
                  MessageBar 描述信息一段话，描述信息一段话
                </MessageBarTitle>
              </MessageBarBody>
              <MessageBarActions>
                <MessageBarAction>行动链接</MessageBarAction>
                <MessageBarAction>行动链接</MessageBarAction>
              </MessageBarActions>
            </MessageBar>
          ) : null}

          {preset.metrics ? (
            <div className="flex flex-wrap gap-3">
              <MetricCard className="min-w-56 flex-1 gap-2">
                <MetricCardLabel>Credit用量</MetricCardLabel>
                <MetricCardTitle className="text-3xl">68%</MetricCardTitle>
                <ProgressPro value={68} />
              </MetricCard>
              {SPARKLINES.map((item) => (
                <MetricCard key={item.label} className="min-w-56 flex-1 gap-2">
                  <MetricCardLabel>{item.label}</MetricCardLabel>
                  <div className="flex items-end justify-between gap-3">
                    <MetricCardTitle className="text-3xl">
                      {item.value}
                    </MetricCardTitle>
                    <Sparkline color={item.color} />
                  </div>
                </MetricCard>
              ))}
            </div>
          ) : null}
        </section>

        <section className="flex min-w-0 flex-col gap-3">
          {preset.sectionLabel ? (
            <h2 className="text-sm font-medium">{preset.sectionLabel}</h2>
          ) : null}

          {/* 工具栏 + 视图切换 + 卡片网格 + 表格 + 分页都在这一个组件里，且不传高度。 */}
          <DataTablePro
            columns={preset.columns}
            data={preset.rows}
            getRowId={(row) => row.id}
            showColumnSettings={false}
            showViewSwitch
            defaultView={board === "card" ? "card" : "list"}
            cardView={(item) => <ResourceListCard item={item} />}
            cardGrid={(cards) => (
              <ResourceCardGrid data-slot="card-grid" gap={4}>
                {cards}
              </ResourceCardGrid>
            )}
            search={<Input placeholder="搜索..." className="h-8 w-56" />}
            filter={
              <FilterGroupV2
                allFilters={FILTERS}
                filterLabel="筛选"
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
              // 每页条数要和这一页真的渲染多少条对上，默认 20 会和 10 张卡打架。
              pageSize: PAGE_SIZE,
              onChange: setPage,
            }}
          />
        </section>
      </div>
    </div>
  )
}

/**
 * 卡片整张是 `ResourceCard`，**不要手搓**：标题、紧贴标题的编辑图标、右上 `…`、描述两行截断、
 * 底部一排信息与窄容器下的溢出收起，全部是它的 props。
 *
 * 稿上卡高 140、底部信息沉底，用 `contentHeight` 撑内容区实现（组件的既定做法），
 * 不要给卡片写死高度；同行等高由网格拉伸保证。
 *
 * **不要再往外套一层 `HoverCard`。** 卡片自己就有 hover 态（描边转品牌色、`…` 与编辑图标浮现），
 * 外面再挂一层浮层会和它抢同一个手势，补充字段请放进详情页（PT-036）。
 *
 * `titleAction` / `actions` 必须是可点控件（`Button` / `DropdownMenu`），不能只塞图标。
 * 组件只负责占位，不把节点包成按钮。
 *
 * footer **不要写 `maxInlineCount`**。宽度够就全展示，不够才收进 `CollapsedInfo`。
 */
function ResourceListCard({ item }: { item: ResourceItem }) {
  return (
    <ResourceCard
      title={item.name}
      titleAction={
        <IconButton label="编辑">
          <Pencil className="size-3.5" />
        </IconButton>
      }
      actions={<CardActionsMenu />}
      description={item.description}
      contentHeight={24}
      collapsedTitle="实例信息"
      footer={[
        {
          key: "status",
          label: "状态",
          content: <StatusBadge status={item.tone}>{item.status}</StatusBadge>,
        },
        {
          key: "region",
          label: "地域",
          content: item.meta,
          tooltip: "地域创建后不可更改",
        },
        { key: "uid", label: "UID", content: "32341232234" },
        { key: "created", label: "创建时间", content: item.updatedAt },
        {
          key: "network",
          label: "网络信息",
          content: "vpc-bp19nk2athky4r42qwobl",
        },
      ]}
    />
  )
}

function IconButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Button variant="ghost" size="icon" className="size-6" aria-label={label}>
      {children}
    </Button>
  )
}

function CardActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton label="更多操作">
          <MoreHorizontal className="size-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil className="size-4" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="size-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** 指标卡里的迷你趋势图。**只是示意**，不规定图表库。 */
function Sparkline({ color }: { color: string }) {
  return (
    <ChartContainer
      config={{ value: { label: "趋势", color } }}
      className="h-10 w-28"
    >
      <AreaChart data={TREND} accessibilityLayer>
        <Area
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.15}
          strokeWidth={1.5}
          type="monotone"
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

interface ResourceItem {
  id: string
  name: string
  description: string
  status: string
  tone: StatusBadgeStatus
  meta: string
  updatedAt: string
}

/** 样本行。更新时间在稿上是同一份占位值。 */
const makeItem = (
  id: string,
  name: string,
  rest: Pick<ResourceItem, "description" | "status" | "tone" | "meta">,
): ResourceItem => ({
  id,
  name,
  ...rest,
  updatedAt: "2025-05-20 10:58:38",
})

/** 每页 10 条：`pageSize` 要和这一页真的渲染多少条对上，不然分页器在说另一件事。 */
const PAGE_SIZE = 10

/** 五个状态循环铺满一页，让卡片视图把六档语义色都露出来。 */
const WORKSPACE_STATES: Array<[string, StatusBadgeStatus]> = [
  ["运行中", "success"],
  ["未开始", "unknown"],
  ["配置中", "normal"],
  ["不可用", "warning-high"],
  ["待配置", "warning-medium"],
]

const WORKSPACE_ROWS: ResourceItem[] = Array.from(
  { length: PAGE_SIZE },
  (_, index) => {
    const [status, tone] =
      WORKSPACE_STATES[index % WORKSPACE_STATES.length] ?? WORKSPACE_STATES[0]
    return makeItem(`ws-${index + 1}`, "Erin's Workspace", {
      description: "工作空间描述文案一句话",
      status,
      tone,
      meta: "华东1（杭州）",
    })
  },
)

const FILE_SAMPLES: Array<[string, string, string, StatusBadgeStatus]> = [
  ["Q4_Market_Analysis.pdf", "季度市场分析报告", "解析完成", "success"],
  ["Q4_Market_Analysis.pdf", "季度市场分析报告", "解析失败", "warning-high"],
  ["Project_Scope_v2.docx", "项目范围说明", "解析中", "normal"],
  ["Customer_Feedback.txt", "客户反馈汇总", "未开始", "unknown"],
  ["Design_Guideline.md", "设计规范摘要", "解析完成", "success"],
]

const FILE_ROWS: ResourceItem[] = Array.from(
  { length: PAGE_SIZE },
  (_, index) => {
    const [name, description, status, tone] =
      FILE_SAMPLES[index % FILE_SAMPLES.length] ?? FILE_SAMPLES[0]
    return makeItem(`f-${index + 1}`, name, {
      description,
      status,
      tone,
      meta: "2.4 MB",
    })
  },
)

/** 两张稿的列名不同，但形状是同一个——**模板不锁对象**（裁 1）。 */
const buildColumns = (
  nameHeader: string,
  metaHeader: string,
): Array<ColumnDef<ResourceItem>> => [
  { accessorKey: "name", header: nameHeader, size: 260 },
  {
    accessorKey: "status",
    header: "状态",
    size: 120,
    cell: ({ row }) => (
      <StatusBadge status={row.original.tone}>
        {row.original.status}
      </StatusBadge>
    ),
  },
  { accessorKey: "updatedAt", header: "更新时间", size: 200 },
  { accessorKey: "meta", header: metaHeader, size: 140 },
  {
    id: "actions",
    header: "操作",
    size: 100,
    cell: () => (
      <span className="flex items-center gap-1">
        <IconButton label="编辑">
          <Pencil className="size-4" />
        </IconButton>
        <IconButton label="删除">
          <Trash2 className="size-4 text-warning-high" />
        </IconButton>
      </span>
    ),
  },
]

const WORKSPACE_BOARD = {
  parent: "资源管理",
  crumb: "Workspace",
  title: "Welcome back!",
  subtitle: "Here's a list of your tasks for this month!",
  icon: false,
  notice: true,
  metrics: true,
  sectionLabel: "Workspace",
  rows: WORKSPACE_ROWS,
  columns: buildColumns("名称", "地域"),
}

const KNOWLEDGE_BOARD = {
  parent: "知识中心",
  crumb: "Erin's knowledge base",
  title: "Erin's knowledge base",
  subtitle: "艾琳的 CloudAI 文档知识库",
  icon: true,
  notice: false,
  metrics: false,
  sectionLabel: "",
  rows: FILE_ROWS,
  columns: buildColumns("文件名", "文件大小"),
}

/**
 * 筛选项字典。**项数要多于 `maxInlineCount`（默认 3）**，否则右侧的「+」不渲染，
 * 展开的三项之外就再也加不进来。
 */
const FILTERS: Record<string, FilterBoxConfigV2> = {
  status: {
    title: "状态",
    selectMode: "multiple",
    dataSource: [
      { label: "运行中", value: "running" },
      { label: "配置中", value: "configuring" },
      { label: "不可用", value: "unavailable" },
    ],
  },
  region: {
    title: "地域",
    selectMode: "multiple",
    dataSource: [
      { label: "华东1（杭州）", value: "cn-hangzhou" },
      { label: "华北2（北京）", value: "cn-beijing" },
    ],
  },
  createdAt: { title: "创建时间", type: "dateRange" },
  owner: {
    title: "负责人",
    selectMode: "multiple",
    dataSource: [
      { label: "Erin", value: "erin" },
      { label: "Ada", value: "ada" },
    ],
  },
}

const SPARKLINES = [
  { label: "内存使用率", value: "61%", color: "hsl(var(--chart-2))" },
  { label: "Token使用率", value: "43%", color: "hsl(var(--chart-3))" },
  { label: "今日调用量", value: "10,726", color: "hsl(var(--chart-4))" },
]

const TREND = Array.from({ length: 24 }, (_, index) => ({
  value: 20 + ((index * 29) % 45),
}))
