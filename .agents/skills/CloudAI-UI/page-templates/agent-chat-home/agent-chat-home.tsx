/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/agent-chat-home.md，改之前先读它。
 * 填 SLOT 时对照同目录 agent-chat-home.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"
import { ArrowUp, Plus, RefreshCw, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Agent chat 首页的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - 垂直居中用 `min-h-full` + `my-auto`，**不是 `h-full` + `justify-center`**。后者在内容比
 *   容器高时会把顶部裁掉，而且滚不回去；`my-auto` 有余量时居中、没余量时自动归零。
 * - `QuickActionButtons` 在 `ChatInput` 的外层容器里、输入框上方，不是内容列的第三个兄弟。
 *   欢迎语到输入框那 68 就是「间距 24 + 快捷条 44」凑出来的，别去写死 68。
 * - 演示卡宽 216 是 `basis-[13.5rem] flex-1` 在 680 列里的推导值，不写死（PT-011）。配
 *   `flex-wrap` 才有稿上「放不下时 2 + 1」，写成 `w-[13.5rem]` 或纯 `flex-1` 都拿不到换行。
 *
 * 不可变量、插槽的允许放与空态、状态机制、响应式与滚动归属，全部逐条写在同目录的
 * `agent-chat-home.md` 里。**照抄，不要重算。**
 */
export function AgentChatHome({
  demoLayout = "cards",
  demoCaseCount = 3,
}: {
  /** 演示案例的两种填法，同一份骨架；不是页面状态。 */
  demoLayout?: "cards" | "list"
  /** 0 = 无演示案例空态：整个 DemoSection 连段标题一起不渲染。 */
  demoCaseCount?: number
}) {
  return (
    // min-h-full 而不是 h-full：内容超高时要能顶开外壳的滚动容器。
    <div className="flex min-h-full flex-col p-5">
      <div className="mx-auto my-auto flex w-full max-w-[42.5rem] flex-col gap-24">
        {/* 欢迎语与输入框是一组，间距 24 */}
        <div className="flex flex-col gap-6">
          {/* SLOT:WelcomeGreeting —— 纯文本（产品名 + 欢迎语），问候语随用户语言 */}
          <SlotBox label="WelcomeGreeting" className="mx-4 min-h-9" />

          {/* 输入框外层：radius 16，只有下与左右各 4 的内边距，快捷条压在输入框上方 */}
          <div className="flex flex-col rounded-2xl px-1 pb-1">
            {/* SLOT:QuickActionButtons —— 2～4 个功能按钮 + 1 个扩展按钮，各高 28 */}
            <div className="flex h-11 shrink-0 items-center gap-2 px-1">
              <SlotBox className="h-7 w-28 rounded-2xl" />
              <SlotBox className="h-7 w-28 rounded-2xl" />
              <SlotBox className="size-7 rounded-full">
                <RefreshCw className="size-3.5" />
              </SlotBox>
            </div>

            {/* SLOT:ChatInput —— 多行输入 + 底部操作栏；高 160 是最小值，可随输入增长 */}
            <div className="flex min-h-40 flex-col justify-between rounded-2xl border border-brand-2 bg-card p-4 shadow-sm">
              <SlotBox label="ChatInput" className="min-h-14 border-none" />

              {/* 底部操作行高 28：左侧附件 / 模式，右侧发送 */}
              <div className="flex h-7 shrink-0 items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlotBox className="size-7 border-none">
                    <Plus className="size-4" />
                  </SlotBox>
                  <SlotBox className="size-7 border-none">
                    <SlidersHorizontal className="size-4" />
                  </SlotBox>
                </div>
                <SlotBox className="size-7 rounded-full">
                  <ArrowUp className="size-4" />
                </SlotBox>
              </div>
            </div>
          </div>
        </div>

        {/* 无演示案例：整段连标题一起不渲染。剩下的内容按 my-auto 重新居中，这是对的——
            稿的规则是「输入框 + 演示案例垂直居中于内容区」，少一块就该重新居中。 */}
        {demoCaseCount > 0 ? (
          <section className="flex flex-col gap-4 px-1">
            {/* SLOT:DemoSectionLabel —— 段标题单行，如「演示案例」 */}
            <SlotBox
              label="DemoSectionLabel"
              className="min-h-3.5 justify-start border-none px-0"
            />

            {/* SLOT:DemoCaseCard —— 标题 + 一句话描述，禁止长段落；默认普通描边，
                仅 fine pointer hover 时显示品牌描边与点阵渐变底；两种填法见下 */}
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

/**
 * 卡片式：3 张横排恰好填满 680（`3 × 216 + 2 × 12 = 672`，加两侧 px-1 正好 680）。
 * `basis` 给最小意愿宽、`flex-wrap` 负责放不下时换行成 2 + 1；容器宽于 672 时三张一起长。
 */
function DemoCards({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: count }, (_, index) => (
        <SlotBox
          key={index}
          label="DemoCaseCard"
          className="h-[7.5rem] flex-1 basis-[13.5rem] rounded-2xl border-solid border-border bg-card pointer-fine:hover:border-brand-2"
        />
      ))}
    </div>
  )
}

/** 列表式：同一段的另一种填法，整行占满内容列，行数不固定。 */
function DemoList({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }, (_, index) => (
        <SlotBox
          key={index}
          label="DemoCaseCard"
          className="h-9 rounded-2xl border-solid border-border bg-card pointer-fine:hover:border-brand-2"
        />
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
