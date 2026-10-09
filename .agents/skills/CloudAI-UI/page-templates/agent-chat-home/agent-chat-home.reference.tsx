/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 agent-chat-home.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import * as React from "react"
import {
  BarChart4,
  ChevronDown,
  CodeXml,
  Database,
  Grid2x2Check,
  Plus,
  RotateCw,
  Settings2,
  type LucideIcon,
} from "lucide-react"

import {
  AiPromptInput,
  AiPromptInputSubmit,
  AiPromptInputTextarea,
  AiPromptInputToolbar,
  AiPromptInputToolbarButton,
} from "@/components/ui/ai-prompt-input"

import demoCardWash from "./demo-card-wash.png"
import insightMode from "./insight-mode.svg"

/**
 * Agent chat 首页的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `agent-chat-home.tsx`。对照 `AgentChat / Sidebar-Open / DemoCards`。
 *
 * 输入框用 `AiPromptInput`（附件 / 模式 / 发送），不要再手搓一套。
 * 「推荐问题占位」「场景案例标题」是稿上的占位句，换掉；层级和间距留下。
 */
export function AgentChatHomeReference({
  demoLayout = "cards",
  demoCaseCount = 3,
}: {
  demoLayout?: "cards" | "list"
  demoCaseCount?: number
}) {
  return (
    <div className="flex min-h-full flex-col p-5">
      <div className="mx-auto my-auto flex w-full max-w-[42.5rem] flex-col gap-24">
        <div className="flex flex-col gap-6">
          <h1 className="flex items-baseline gap-2 px-4 text-3xl font-medium leading-9">
            <span className="text-foreground">Hello, I&apos;m</span>
            <span
              data-slot="agent-name"
              className="bg-brand-gradient bg-clip-text text-transparent"
            >
              CloudAI Agent Template
            </span>
          </h1>

          <div className="flex flex-col rounded-2xl px-1 pb-1">
            <div className="flex h-11 shrink-0 items-center gap-2 px-1">
              <SuggestPill icon={BarChart4} />
              <SuggestPill icon={Grid2x2Check} />
              <button
                type="button"
                aria-label="换一批推荐问题"
                className="flex size-6 items-center justify-center rounded-2xl bg-muted shadow-[0_0.25rem_0.75rem_0_rgb(172_176_183/0.1)]"
              >
                <RotateCw className="size-3" strokeWidth={1.75} />
              </button>
            </div>

            <AiPromptInput className="min-h-40 justify-between rounded-2xl border-brand-3 shadow-[0_0.25rem_1rem_0_hsl(var(--brand-2))]">
              <AiPromptInputTextarea placeholder="给我布置一个数据分析任务，'shift+enter'换行" />
              <AiPromptInputToolbar className="h-7">
                <AiPromptInputToolbarButton tooltip="添加附件">
                  <Plus strokeWidth={1.75} />
                </AiPromptInputToolbarButton>
                <AiPromptInputToolbarButton tooltip="设置">
                  <Settings2 strokeWidth={1.75} />
                </AiPromptInputToolbarButton>
                <span aria-hidden className="mx-1 h-4 w-px bg-border" />
                <button
                  type="button"
                  className="flex h-7 items-center gap-1 rounded-2xl px-2 text-sm text-foreground hover:bg-muted"
                >
                  <img
                    src={insightMode}
                    alt=""
                    className="size-4"
                    aria-hidden
                  />
                  均衡
                  <ChevronDown
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                </button>
                <AiPromptInputSubmit className="ml-auto size-7" />
              </AiPromptInputToolbar>
            </AiPromptInput>
          </div>
        </div>

        {demoCaseCount > 0 ? (
          <section className="flex flex-col gap-4 px-1">
            <p className="text-sm leading-none text-muted-foreground">
              演示案例
            </p>
            {demoLayout === "cards" ? (
              <DemoCards count={demoCaseCount} />
            ) : (
              <DemoList count={demoCaseCount} />
            )}
          </section>
        ) : null}
      </div>
    </div>
  )
}

function SuggestPill({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <button
      type="button"
      className="flex h-7 items-center gap-1.5 rounded-2xl border border-border bg-background px-3 text-xs leading-4 text-secondary-foreground shadow-[0_0.25rem_0.75rem_0_rgb(172_176_183/0.1)]"
    >
      <Icon className="size-3.5" strokeWidth={1.75} />
      推荐问题占位
    </button>
  )
}

const DEMO_CARDS: DemoCase[] = [
  { id: "demo-1", icon: BarChart4, title: "场景案例标题" },
  { id: "demo-2", icon: CodeXml, title: "场景案例标题" },
  { id: "demo-3", icon: Database, title: "场景案例标题" },
]

const DEMO_LIST: DemoCase[] = [
  {
    id: "list-1",
    icon: BarChart4,
    title: "场景案例标题标题标题",
  },
  { id: "list-2", icon: CodeXml, title: "场景案例标题" },
  {
    id: "list-3",
    icon: Database,
    title: "场景案例标题标题标题标题标题标题",
  },
  {
    id: "list-4",
    icon: Database,
    title: "场景案例标题场景案例标题场景案例标题",
  },
]

type DemoCase = {
  id: string
  icon: LucideIcon
  title: string
}

function DemoIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="relative z-10 flex size-5 shrink-0 items-center justify-center rounded-sm border border-border">
      <Icon className="size-3" strokeWidth={1.75} />
    </span>
  )
}

function DemoCaseWash() {
  return (
    <span
      data-slot="demo-case-wash"
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,hsl(var(--background))_27%,hsl(var(--brand-1))_102%)] opacity-0 pointer-fine:group-hover:opacity-100"
    >
      <img
        data-slot="demo-card-wash-image"
        src={demoCardWash}
        alt=""
        className="absolute left-0 top-0 size-[25rem] max-w-none"
      />
    </span>
  )
}

function DemoCards({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {DEMO_CARDS.slice(0, count).map((item) => (
        <button
          key={item.id}
          type="button"
          className="group relative flex h-[7.5rem] flex-1 basis-[13.5rem] flex-col items-start justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 text-left pointer-fine:hover:border-brand-2"
        >
          <DemoCaseWash />
          <DemoIcon icon={item.icon} />
          <span className="relative z-10 flex flex-col gap-2.5">
            <span className="text-base leading-none text-foreground">
              {item.title}
            </span>
            <span className="text-xs tracking-[0.03em] text-muted-foreground">
              一句话内容详情
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

function DemoList({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-3">
      {DEMO_LIST.slice(0, count).map((item) => (
        <button
          key={item.id}
          type="button"
          className="group relative flex h-[2.125rem] items-center gap-2.5 overflow-hidden rounded-lg border border-border bg-card pl-3 pr-4 text-left pointer-fine:hover:border-brand-2"
        >
          <DemoCaseWash />
          <DemoIcon icon={item.icon} />
          <span className="relative z-10 flex items-center gap-2.5">
            <span className="text-sm leading-none text-foreground">
              {item.title}
            </span>
            <span className="text-xs tracking-[0.03em] text-muted-foreground">
              一句话内容详情
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}
