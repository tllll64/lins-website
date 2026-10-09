/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 quick-start.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import * as React from "react"
import { ArrowRight, Database, FileSpreadsheet, Server } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { StatusBadge } from "@/components/ui/status-badge"

/**
 * 快速开始的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `quick-start.tsx`。对照 `快速开始 / Sidebar-Open`（#295:23356）。
 *
 * 这份还原件主要示范三件：
 *
 * 1. **表单列封顶 1000 居中**，左右内边距只是下限（窄档 64、`xl:` 起 160）。超宽屏上
 *    多出来的宽度全部由 padding 吃掉，表单不跟着拉宽（PT-038）。
 * 2. **选项卡是单选，但不画 radio 圆点**（裁 10）：`RadioGroup` + `sr-only` 的
 *    `RadioGroupItem` 保住键盘方向键与读屏语义，选中态只用描边 + 浅底表达。
 * 3. **步骤条对整个内容区居中**，不是对表单列居中，所以它在表单列外面。
 *
 * 步骤条与选项卡仓里都没有对应组件，就地画；其余都用现成的：面包屑 shadcn `Breadcrumb`、
 * 主操作 `Button`、卡片上的 pill `StatusBadge`。
 *
 * 数据源样本与 `Step N` 文案都是占位内容，换掉；层级与间距留下。
 */
export function QuickStartReference() {
  const [value, setValue] = React.useState(OPTIONS[0].value)

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
              <BreadcrumbLink href="#">Agent 工厂</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>新建 Agent</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-4 bg-gradient-to-b from-background to-transparent"
        />
      </div>

      <div className="flex flex-col gap-7 px-16 pb-9 pt-4 xl:px-40">
        {/* 步骤条在表单列外面：它对整个内容区居中。 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {STEPS.map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 ? (
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground"
                />
              ) : null}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-xl border px-2 text-xs font-medium tabular-nums",
                    index === 0
                      ? "border-brand-3 bg-brand-1 text-brand-8"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <span className="text-xs font-medium">{step}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[62.5rem] flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              选择数据源
            </h1>
            <p className="text-base text-muted-foreground">
              Agent 会基于这里选定的数据回答问题，之后还能再换
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <RadioGroup
              value={value}
              onValueChange={setValue}
              aria-label="数据源"
              className="gap-2"
            >
              {OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  option={option}
                  selected={value === option.value}
                />
              ))}
            </RadioGroup>

            {/* 主操作左对齐，齐表单列左边缘；跟随内容滚动，不吸底。 */}
            <div className="flex">
              <Button>下一步</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface DataSourceOption {
  value: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  tags: string[]
}

/**
 * 选项卡：整张卡是 `<label>`，真正的 radio 是里面 `sr-only` 的 `RadioGroupItem`。
 *
 * **选中态只有描边 + 浅底**，不画圆点（裁 10）。键盘焦点落在隐藏的 radio 上，所以卡片用
 * `focus-within` 出焦点环——去掉它的话方向键还能选，但看不出选到哪张了。
 */
function OptionCard({
  option,
  selected,
}: {
  option: DataSourceOption
  selected: boolean
}) {
  const Icon = option.icon

  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col gap-4 rounded-2xl border bg-card p-4",
        "focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2",
        selected
          ? "border-brand-7 bg-brand-1"
          : "border-border hover:border-brand-3",
      )}
    >
      <RadioGroupItem value={option.value} className="sr-only" />
      <div className="flex items-center gap-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded border border-border">
          <Icon className="size-3" />
        </span>
        <span className="text-base">{option.title}</span>
      </div>
      <p className="text-base text-muted-foreground">{option.description}</p>
      <div className="flex flex-wrap items-center gap-1">
        {option.tags.map((tag) => (
          <StatusBadge key={tag} iconVariant="none">
            {tag}
          </StatusBadge>
        ))}
      </div>
    </label>
  )
}

const STEPS = ["选择数据源", "配置参数", "完成"]

const OPTIONS: DataSourceOption[] = [
  {
    value: "sample",
    title: "示例数据库",
    description:
      "一个虚构业务的示例库，含 10 张表、约 165K 行合成数据，覆盖订单、商品、客户、支付、评价与履约。",
    icon: Database,
    tags: ["10 张表", "165K 行", "只读"],
  },
  {
    value: "rds",
    title: "已连接的 RDS 实例",
    description:
      "从你已经授权过的实例里挑一个库。Agent 只读取表结构与抽样数据，不写入。",
    icon: Server,
    tags: ["3 个实例", "需要白名单"],
  },
  {
    value: "upload",
    title: "上传表格文件",
    description:
      "支持 CSV 与 Excel，单文件 200MB 以内。上传后会先解析表头，确认字段类型再入库。",
    icon: FileSpreadsheet,
    tags: ["CSV", "Excel", "≤200MB"],
  },
]
