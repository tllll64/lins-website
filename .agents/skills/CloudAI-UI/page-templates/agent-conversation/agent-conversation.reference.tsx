/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 agent-conversation.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import * as React from "react"
import {
  Copy,
  Filter,
  LineChart,
  Plus,
  RefreshCw,
  Settings2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react"

import { AiAttachmentCard } from "@/components/ui/ai-attachment"
import {
  AiPlanCard,
  AiPlanCardContent,
  AiPlanCardHeader,
  AiPlanCardStep,
} from "@/components/ui/ai-plan-card"
import {
  AiPromptInput,
  AiPromptInputSubmit,
  AiPromptInputTextarea,
  AiPromptInputToolbar,
  AiPromptInputToolbarButton,
} from "@/components/ui/ai-prompt-input"
import {
  AiThinking,
  AiToolCall,
  AiToolCallName,
  AiToolCallParams,
  getAiToolCallIcon,
} from "@/components/ui/ai-trace"

/**
 * Agent 对话页的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `agent-conversation.tsx`。对照 `Agent Conversation / Viewport`。
 *
 * 这份还原件的主要作用是示范**槽里该放哪个组件**：思考与工具调用用 `AiThinking` / `AiToolCall`，
 * 执行计划用 `AiPlanCard`，产出文件用 `AiAttachmentCard fluid`，追问框用
 * `AiPromptInput collapsible`。这些过程件全都已经封装好了，不要在页面里手搓。
 *
 * 「帮我看下…」「CPU 异常诊断报告」是稿上的占位内容，换掉；层级与间距留下。
 */
export function AgentConversationReference() {
  return (
    <div className="flex min-h-full flex-col p-5">
      <div className="mx-auto flex w-full max-w-[50rem] flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-8">
          <UserBubble>
            帮我看下 rm-bp1************i1o 最近的 CPU 异常
          </UserBubble>

          <ReplyBlock>
            <AgentLogo />
            <AiThinking
              status="success"
              title="Thinking"
              duration="2.5s"
              defaultExpanded={false}
            >
              用户想要诊断实例 CPU 使用率问题。先搜索相关 DAS
              API，再执行一次性性能诊断。
            </AiThinking>
            <Paragraph
              lead="已定位到两处可能的诱因"
              body="近 24 小时内出现两段 CPU 使用率高于 85% 的区间，均伴随慢 SQL 数量上升。下面是我准备执行的诊断计划，确认后开始。"
            />
            <AiToolCall
              status="success"
              icon={getAiToolCallIcon("execute")}
              title="执行完成"
              detail="getPerformanceDiagnoseForOneShot"
            >
              <AiToolCallName>getPerformanceDiagnoseForOneShot</AiToolCallName>
              <AiToolCallParams>
                {`{\n  "instance_id": "rm-bp1************i1o"\n}`}
              </AiToolCallParams>
            </AiToolCall>
            <AiPlanCard className="max-w-[40rem]">
              <AiPlanCardHeader title="执行计划" duration="4.5s" />
              <AiPlanCardContent>
                {PLAN_STEPS.map((step) => (
                  <AiPlanCardStep
                    key={step.value}
                    value={step.value}
                    icon={<step.icon strokeWidth={1.75} />}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </AiPlanCardContent>
            </AiPlanCard>
          </ReplyBlock>

          <UserBubble>把结论导出成报告</UserBubble>

          <ReplyBlock>
            <AgentLogo />
            <AiThinking
              status="success"
              title="Thinking"
              duration="1.2s"
              defaultExpanded={false}
            >
              汇总两段高负载区间的诊断结论，按实例维度导出。
            </AiThinking>
            <Paragraph
              lead="报告已生成"
              body="包含两段高负载区间的慢 SQL 明细、等待事件分布与优化建议。"
            />
            <AiAttachmentCard
              fluid
              className="max-w-[40rem]"
              title="CPU 异常诊断报告.xlsx"
              meta="excel · 1.21 MB · 今天 14:32"
            />
            <ActionBar />
            <SuggestedQuestions />
          </ReplyBlock>
        </div>

        <FollowUpInput />
      </div>
    </div>
  )
}

/** 用户侧：右对齐、宽度跟随内容，上限就是对话列宽。 */
function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <p
      data-slot="user-bubble"
      className="max-w-full self-end rounded-[0.875rem] bg-brand-2 px-4 py-3 text-sm leading-5 text-brand-10"
    >
      {children}
    </p>
  )
}

/** Agent 侧：通栏、无气泡，块内各段间距 12。 */
function ReplyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div data-slot="agent-reply-block" className="flex min-h-20 flex-col gap-3">
      {children}
    </div>
  )
}

function AgentLogo() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-gradient"
      >
        <Sparkles className="size-3 text-card" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-medium leading-[1.375rem] text-brand-10">
        Data Agent
      </span>
    </div>
  )
}

function Paragraph({ lead, body }: { lead: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 text-sm leading-[1.625rem] text-foreground">
      <p className="font-medium">{lead}</p>
      <p>{body}</p>
    </div>
  )
}

const REPLY_ACTIONS: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Copy, label: "复制" },
  { icon: ThumbsUp, label: "有帮助" },
  { icon: ThumbsDown, label: "没帮助" },
  { icon: RefreshCw, label: "重新生成" },
]

function ActionBar() {
  return (
    <div className="flex h-10 items-center gap-1">
      {REPLY_ACTIONS.map(({ icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="flex size-6 items-center justify-center rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </button>
      ))}
    </div>
  )
}

const FOLLOW_UPS = [
  "这两段高负载的慢 SQL 有共同的执行计划吗？",
  "帮我把优化建议整理成变更单",
  "设置一个 CPU 超过 85% 的告警",
]

function SuggestedQuestions() {
  return (
    <div className="flex flex-col items-start gap-2">
      {FOLLOW_UPS.map((question) => (
        <button
          key={question}
          type="button"
          className="flex h-7 items-center rounded-2xl border border-border bg-background px-4 text-xs leading-4 text-secondary-foreground hover:border-brand-3"
        >
          {question}
        </button>
      ))}
    </div>
  )
}

/**
 * 追问框：`AiPromptInput collapsible` 的收起态正是稿上那条 52 胶囊（DEC-104），
 * 聚焦或有内容时自己形变回多行，不需要在页面里写两套。
 */
function FollowUpInput() {
  const [value, setValue] = React.useState("")

  return (
    <div className="sticky bottom-5 z-10 mt-8">
      <AiPromptInput
        collapsible
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue("")}
      >
        <AiPromptInputTextarea placeholder="进一步询问..." />
        <AiPromptInputToolbar>
          <AiPromptInputToolbarButton tooltip="上传附件">
            <Plus strokeWidth={1.75} />
          </AiPromptInputToolbarButton>
          <AiPromptInputToolbarButton tooltip="偏好设置">
            <Settings2 strokeWidth={1.75} />
          </AiPromptInputToolbarButton>
          <AiPromptInputSubmit className="ml-auto" />
        </AiPromptInputToolbar>
      </AiPromptInput>
    </div>
  )
}

const PLAN_STEPS: Array<{
  value: string
  icon: LucideIcon
  title: string
  description?: string
}> = [
  {
    value: "window",
    icon: LineChart,
    title: "定位高负载时间窗",
    description: "按分钟粒度回溯 CPU 使用率，切出高于 85% 的连续区间",
  },
  {
    value: "slowlog",
    icon: Filter,
    title: "抽取区间内的慢 SQL",
    description: "按执行耗时与扫描行数排序，取 Top 20",
  },
  {
    value: "advice",
    icon: LineChart,
    title: "生成优化建议",
  },
]
