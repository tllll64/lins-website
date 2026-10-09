/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/agent-conversation.md，改之前先读它。
 * 填 SLOT 时对照同目录 agent-conversation.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"
import {
  ArrowUp,
  Brain,
  Copy,
  Paperclip,
  RefreshCw,
  SlidersHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Agent 对话进行中的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - **不要在对话流上挂 `overflow-auto`。** 唯一的主滚动容器是外壳的 `ContentArea`，
 *   这里再开一个就会出现内外两条滚动条，而且结果卡片会在自己的小框里内滚。
 * - **输入框是 `sticky bottom-5`，不是 `fixed`、也不是 flex 兄弟。** `fixed` 会脱离内容区、
 *   在侧栏开合与超宽档下错位；写成普通兄弟则滚上去就看不见了。`bottom-5` 与模板根的
 *   `p-5` 是同一个 20，滚到底时输入框停在自然位置、不跳。
 * - **输入框要 `z-10`。** 外壳在 `ContentArea` 底部盖了一层 88 高的渐变遮罩（内滚提示），
 *   输入框正好落在遮罩范围里，不压上去就会被洗成半透明。
 * - **用户消息 `self-end` 右对齐、宽度跟随内容；Agent 回复通栏、不做气泡。** 两侧不是
 *   同一种排法，写成一律气泡或一律通栏都丢掉了「谁在说话」这个信息。
 * - **复杂过程一律用封装好的组件**（`AiPlanCard` / `AiThinking` / `AiAttachmentCard` 等），
 *   不要在这里手写计划列表或附件卡。哪个槽配哪个组件、留多少边距，见 `agent-conversation.md`。
 *
 * 不可变量、插槽的允许放与空态、槽到组件的映射、响应式与滚动归属，全部逐条写在同目录的
 * `agent-conversation.md` 里。**照抄，不要重算。**
 */
export function AgentConversation({
  turnCount = 2,
  replyStatus = "complete",
}: {
  /** 对话轮数。一轮 = 一条用户消息 + 一个 Agent 回复块，纵向堆叠。 */
  turnCount?: number
  /** 末轮回复是否还在流式产出。流式期间 `ActionBar` 与 `SuggestedQuestions` 尚未挂载。 */
  replyStatus?: "streaming" | "complete"
}) {
  return (
    // min-h-full 而不是 h-full：对话超过一屏时要能顶开外壳的滚动容器。
    <div className="flex min-h-full flex-col p-5">
      <div className="mx-auto flex w-full max-w-[50rem] flex-1 flex-col">
        {/* 对话流：轮内、轮间一律 32。`flex-1` 让对话不足一屏时输入框仍贴在底部，
            而不是吊在内容中间。**这一层不挂 overflow**，见文件头。 */}
        <div data-slot="message-flow" className="flex flex-1 flex-col gap-8">
          {Array.from({ length: turnCount }, (_, index) => (
            <React.Fragment key={index}>
              {/* SLOT:UserMessage —— 用户消息气泡 + 时间戳 + 编辑/确认操作。
                  右对齐、宽度跟随内容，上限就是对话列宽；禁止撑满成通栏。 */}
              <SlotBox
                label="UserMessage"
                className="max-w-full self-end rounded-[0.875rem] border-none bg-brand-2 px-4 py-3 text-brand-10"
              />

              {/* SLOT:AgentReplyBlock —— AgentLogo + N 个内容段（文本 / API / 计划 / 表格）。
                  通栏占满对话列、不做气泡；禁止用户侧内容与跨 Agent 的混合回复。 */}
              <AgentReplyBlock
                replyStatus={index === turnCount - 1 ? replyStatus : "complete"}
              />
            </React.Fragment>
          ))}
        </div>

        {/* SLOT:ChatboxInput —— 用 `AiPromptInput collapsible`：功能按钮 · 输入区 · 发送钮
            排成一行 52 胶囊，聚焦或有内容时自己形变回多行。吸底常驻，滚到底时归位。
            这里的几何照 `AiPromptInput` 收起态：内边距 12、间距 4、圆角 26。
            **圆角写 26 而不是 `rounded-full`**——形变成多行后 `rounded-full` 会变成橄榄球。 */}
        <div
          data-slot="chatbox-input"
          className="sticky bottom-5 z-10 mt-8 flex min-h-[3.25rem] items-center gap-1 rounded-[1.625rem] border border-border bg-card p-3 shadow-sm"
        >
          <SlotBox className="size-7 border-none">
            <Paperclip className="size-4" />
          </SlotBox>
          <SlotBox className="size-7 border-none">
            <SlidersHorizontal className="size-4" />
          </SlotBox>
          <SlotBox
            label="ChatboxInput"
            className="ml-1 min-h-6 flex-1 border-none px-0"
          />
          <SlotBox className="size-7 rounded-full">
            <ArrowUp className="size-4" />
          </SlotBox>
        </div>
      </div>
    </div>
  )
}

/**
 * 一个 Agent 回复块：通栏占满对话列，**不做气泡**。块内各段间距统一 12——稿上 logo 到首段是 16、
 * 段与段是 12、结果卡上下是 8，差都在 10 以内，按 PT-008 ② 取一个值。
 *
 * `PlanCard` 与 `ResultAttachment` 宽度上限 640，比对话列窄 160：结果类卡片不撑满，读者才分得清
 * 哪些是叙述、哪些是产出物。
 */
function AgentReplyBlock({
  replyStatus,
}: {
  replyStatus: "streaming" | "complete"
}) {
  return (
    // 各段默认 stretch 到对话列满宽（叙述通栏），结果类卡片靠自己的 max-w 收到 640。
    // 不要在这层写 items-start：那样 `ContentSegment` 会缩成内容宽，长段落读起来就参差不齐。
    <div className="flex min-h-20 flex-col gap-3">
      {/* SLOT:AgentLogo —— Agent 头像（28）+ 名称单行。禁止多行文本与 Badge。 */}
      <div className="flex items-center gap-3">
        <SlotBox className="size-7 shrink-0 rounded-md" />
        <SlotBox
          label="AgentLogo"
          className="h-5 w-32 justify-start border-none px-0"
        />
      </div>

      {/* SLOT:APICallIndicator —— 用 `AiThinking` / `AiToolCall`：图标 + 标签 + 方法名，
          行内一行、宽度跟随内容。禁止放 API 返回体全文。 */}
      <div className="flex min-h-6 items-center gap-3">
        <Brain className="size-4 shrink-0 text-muted-foreground" />
        <SlotBox
          label="APICallIndicator"
          className="h-[1.375rem] w-48 justify-start border-none px-0"
        />
      </div>

      {/* SLOT:ContentSegment —— Markdown 文本块（h6 标题 + 正文），通栏占满对话列。
          禁止嵌套表格超过 2 层。这里的高度只是占位可视高，不是契约。 */}
      <SlotBox label="ContentSegment" className="min-h-16" />

      {/* SLOT:PlanCard —— 用 `AiPlanCard`：步骤列表 + 进度指示，最小高 304。 */}
      <SlotBox label="PlanCard" className="min-h-[19rem] max-w-[40rem]" />

      {/* SLOT:ResultAttachment —— 用 `AiAttachmentCard`：文件类型图标 + 标题 + 大小 + 时间。
          禁止内联预览。 */}
      <SlotBox label="ResultAttachment" className="min-h-14 max-w-[40rem]" />

      {/* 流式产出期间这两块还不存在：没产完的回复既不能复制，也谈不上追问。 */}
      {replyStatus === "complete" ? <ReplyFooter /> : null}
    </div>
  )
}

/** 回复收尾：操作栏固定高 40，推荐问题纵向堆叠、宽度跟随内容。 */
function ReplyFooter() {
  return (
    <>
      {/* SLOT:ActionBar —— 复制 / 点赞 / 点踩 / 刷新，最多 4 个，间距 4。 */}
      <div data-slot="action-bar" className="flex h-10 items-center gap-1">
        {REPLY_ACTIONS.map(({ label, icon: Icon }) => (
          <SlotBox key={label} className="size-6 border-none">
            <Icon className="size-4" />
          </SlotBox>
        ))}
      </div>

      {/* SLOT:SuggestedQuestions —— 2～3 个胶囊标签，点击即发送。
          禁止超过 3 个、禁止多行文本。宽度跟随内容，占位块的三种宽度只是示意。 */}
      <div className="flex flex-col items-start gap-2">
        {SUGGESTION_WIDTHS.map((width, index) => (
          <SlotBox
            key={width}
            label={index === 0 ? "SuggestedQuestions" : undefined}
            className={cn("h-7 rounded-2xl px-4", width)}
          />
        ))}
      </div>
    </>
  )
}

const REPLY_ACTIONS = [
  { label: "复制", icon: Copy },
  { label: "有帮助", icon: ThumbsUp },
  { label: "没帮助", icon: ThumbsDown },
  { label: "重新生成", icon: RefreshCw },
]

const SUGGESTION_WIDTHS = ["w-80", "w-64", "w-72"]

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
