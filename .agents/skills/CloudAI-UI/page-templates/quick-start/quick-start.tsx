/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/quick-start.md，改之前先读它。
 * 填 SLOT 时对照同目录 quick-start.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 快速开始（配置向导）的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - **表单列有上限，宽屏不跟着拉宽。** 左右内边距是下限（窄档 64、≥1280 档 160），
 *   表单列封顶 1000；超宽屏多出来的宽度全部由 padding 吃掉（PT-038）。
 *   直接写 `w-full` 让表单跟着内容区长到 1300+，一行输入框横跨整屏，没人能扫完一行。
 * - **步骤条对整个内容区居中，不是对表单列居中。** 所以它在表单列外面，`justify-center`
 *   打在正文这一层。塞进表单列里在宽屏上会明显偏左。
 * - **步骤条恒横向，2～4 步**，步数少也不改纵向；超过 4 步说明这不是向导，拆页。
 * - **切换步骤是整页内容替换**：`StepHeading` 与选项区一起换，不是弹窗也不是新路由。
 * - **选项卡单选，选中态是描边 + 浅底**，不画 radio 圆点（裁 10）。
 * - **报错一律走语义 token**：选项区加载失败用 `MessageBar`，提交失败在按钮**上方**内联，
 *   **不跳步**；步骤条上出错的那一步用告警色描边（裁 12）。
 * - **主操作在内容底部、左对齐**（齐表单列左边缘），**跟随内容滚动**，不吸底（裁 9）。
 * - **内容里不许再开滚动容器。** 唯一的主滚动容器是外壳的 `ContentArea`。
 * - **面包屑 `sticky top-0`**，底部带渐变遮罩；它要不透明底色，否则滚过去的内容会透出来。
 *
 * 不可变量、插槽的允许放与空态、状态清单、响应式与滚动归属，全部逐条写在同目录的
 * `quick-start.md` 里。**照抄，不要重算。**
 */
export function QuickStart({
  stepCount = 3,
  currentStep = 1,
  errorStep,
  optionCount = 3,
  optionState = "ready",
  selected = true,
  submitError = false,
}: {
  /** 步骤数。2～4，横向，再多就不是向导了。 */
  stepCount?: number
  /** 当前步骤，1 起。 */
  currentStep?: number
  /** 出错的那一步（1 起）。该步在步骤条上用告警色描边，页面**不跳步**。 */
  errorStep?: number
  /** 选项卡数。2～4 张，纵向排列。 */
  optionCount?: number
  /** 选项区状态。四态都发生在选项区内部，步骤条与 `StepHeading` 照常显示。 */
  optionState?: "ready" | "loading" | "empty" | "error"
  /** 有没有选中项。没选中时主操作保持 disabled。 */
  selected?: boolean
  /** 提交失败。报错在主操作**上方**内联，不跳步。 */
  submitError?: boolean
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

      {/* 正文：上 16 下 36，步骤条与表单列之间 28。
          左右内边距是**下限**——窄档 64，`xl:`（1280）起 160；表单列自己还有 1000 的上限，
          超宽屏多出来的宽度由 padding 吃掉（PT-038）。 */}
      <div className="flex flex-col gap-7 px-16 pb-9 pt-4 xl:px-40">
        <StepProgressBar
          stepCount={stepCount}
          currentStep={currentStep}
          errorStep={errorStep}
        />

        {/* 表单列：上限 1000 居中。**不要改成 `w-full`**，那样宽屏上表单会跟着内容区一起长。 */}
        <div
          data-slot="form-column"
          className="mx-auto flex w-full max-w-[62.5rem] flex-col gap-6"
        >
          {/* SLOT:StepHeading —— 当前步骤标题 24/32 + 可选一行说明。
              禁止多段正文、操作按钮；切步骤时它和选项区一起换。 */}
          <div data-slot="step-heading" className="flex flex-col gap-1">
            <SlotBox
              label="StepHeading"
              className="h-8 w-72 justify-start border-none px-0"
            />
            <SlotBox className="h-6 w-96 justify-start border-none px-0" />
          </div>

          {/* 选项区与主操作之间 20。 */}
          <div className="flex flex-col gap-5">
            <OptionGroup
              optionCount={optionCount}
              optionState={optionState}
              selected={selected}
            />

            {/* 提交失败的内联报错在主操作**上方**，用 `MessageBar status="warning-high"`；
                报错之后**留在当前步骤**，不要跳到下一步也不要弹全局 toast。 */}
            {submitError ? (
              <div
                data-slot="submit-error"
                className="rounded-xl border border-warning-high px-4 py-3 text-sm text-warning-high-foreground"
              >
                提交失败的内联报错：`MessageBar`，不跳步
              </div>
            ) : null}

            {/* SLOT:PrimaryAction —— 单行按钮文案 + 可选 loading，用 `Button size="lg"`。
                **底部左对齐**，齐表单列左边缘，跟随内容滚动，**不吸底**。
                未选任何项时保持 disabled。禁止副标题、多个图标、二级操作。 */}
            <div className="flex">
              <SlotBox
                label="PrimaryAction"
                data-slot="primary-action"
                data-state={selected ? "enabled" : "disabled"}
                className={cn(
                  "h-9 w-32 rounded-lg",
                  selected ? undefined : "opacity-50",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 步骤条：横向，步与步之间用 `ArrowRight` 分隔。
 *
 * **它在表单列外面**，对整个内容区居中（增强项）。**恒横向**，步数少也不改纵向。
 * 窄档只压缩间距、允许换行，不改方向。
 */
function StepProgressBar({
  stepCount,
  currentStep,
  errorStep,
}: {
  stepCount: number
  currentStep: number
  errorStep?: number
}) {
  return (
    <div
      data-slot="step-progress-bar"
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {/* SLOT:StepProgressBar —— 2～4 个 `StepIndicator`，横向居中。
          禁止纵向排列、超过 4 步；不要把它塞进表单列里。 */}
      {Array.from({ length: stepCount }, (_, index) => (
        <React.Fragment key={index}>
          {index > 0 ? (
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground"
            />
          ) : null}
          <StepIndicator
            step={index + 1}
            state={stepState(index + 1, currentStep, errorStep)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

type StepState = "completed" | "active" | "upcoming" | "error"

/** 出错的那一步优先显示 error，与当前步无关——报错**不跳步**，两者可以是同一步。 */
function stepState(
  step: number,
  currentStep: number,
  errorStep?: number,
): StepState {
  if (step === errorStep) {
    return "error"
  }
  if (step === currentStep) {
    return "active"
  }
  return step < currentStep ? "completed" : "upcoming"
}

/**
 * 步骤项：序号胶囊 + 标签，间距 8。
 *
 * 四态只改序号胶囊的描边与文字色，**标签恒黑**——稿上三步的标签都是同一色，
 * 靠胶囊区分进度。出错那一步用 `warning-high`，不要自己配一个红。
 */
function StepIndicator({ step, state }: { step: number; state: StepState }) {
  return (
    <div
      data-slot="step-indicator"
      data-state={state}
      className="flex items-center gap-2"
    >
      {/* SLOT:StepIndicator —— 步骤序号 + 步骤标签。
          禁止多行描述、用图标替换序号。 */}
      <span
        className={cn(
          "flex h-5 min-w-5 items-center justify-center rounded-xl border px-2 text-xs font-medium tabular-nums",
          state === "error" &&
            "border-warning-high text-warning-high-foreground",
          state === "active" && "border-brand-3 bg-brand-1 text-brand-8",
          state === "completed" && "border-brand-3 bg-brand-1 text-brand-8",
          state === "upcoming" && "border-border text-muted-foreground",
        )}
      >
        {step}
      </span>
      <SlotBox
        label={`Step ${step}`}
        className="h-4 border-none px-0 text-xs font-medium text-foreground"
      />
    </div>
  )
}

/**
 * 选项区。**四个状态都发生在这一层内部**，步骤条与 `StepHeading` 照常显示——
 * 整页级的空白页或错误页会把用户已经走过的步骤也一起抹掉。
 */
function OptionGroup({
  optionCount,
  optionState,
  selected,
}: {
  optionCount: number
  optionState: "ready" | "loading" | "empty" | "error"
  selected: boolean
}) {
  return (
    <div
      data-slot="option-group"
      role="radiogroup"
      aria-label="数据源"
      className="flex flex-col gap-2"
    >
      {/* SLOT:DataSourceOptionGroup —— 2～4 张 `DataSourceOptionCard`，纵向排列，卡间 8，**单选**。
          禁止放与选择无关的操作；空态显示「暂无可用数据源」。 */}
      {optionState === "loading"
        ? Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              data-slot="option-skeleton"
              className="h-28 animate-pulse rounded-2xl border border-border bg-muted/40"
            />
          ))
        : null}

      {optionState === "empty" ? (
        <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground">
          空态：暂无可用数据源
        </div>
      ) : null}

      {optionState === "error" ? (
        <div
          data-slot="option-error"
          className="flex items-center justify-between gap-4 rounded-xl border border-warning-high px-4 py-3 text-sm text-warning-high-foreground"
        >
          选项区内联报错：`MessageBar` + 重试，不用整页错误页
          <SlotBox className="h-8 w-16 shrink-0" />
        </div>
      ) : null}

      {optionState === "ready"
        ? Array.from({ length: optionCount }, (_, index) => (
            <OptionCard
              key={index}
              first={index === 0}
              selected={selected && index === 0}
            />
          ))
        : null}
    </div>
  )
}

/**
 * 选项卡：内边距 16、块间 16、圆角 16。
 *
 * **选中态只有描边 + 浅底**，不画 radio 圆点（裁 10）。卡高由内容决定——描述几行就几行，
 * 不要写死高度去对齐稿面那张图。
 */
function OptionCard({
  first,
  selected,
}: {
  first: boolean
  selected: boolean
}) {
  return (
    <div
      data-slot="option-card"
      role="radio"
      aria-checked={selected}
      // roving tabindex：选中项可聚焦；一个都没选时把焦点入口留给第一张，
      // 否则整组用键盘根本进不来。
      tabIndex={selected || first ? 0 : -1}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-card p-4",
        selected ? "border-brand-7 bg-brand-1" : "border-border",
      )}
    >
      {/* SLOT:DataSourceOptionCard —— 选项图标 + 标题 + 可选 Badge + 描述。
          禁止长列表、多个主操作按钮、大图。 */}
      <div className="flex items-center gap-2">
        <SlotBox className="size-5 rounded" />
        <SlotBox
          label={first ? "DataSourceOptionCard" : undefined}
          className="h-6 w-48 justify-start border-none px-0"
        />
      </div>
      <SlotBox className="h-10 w-full justify-start border-none px-0" />
      <div className="flex items-center gap-1">
        <SlotBox className="h-5 w-12 rounded-xl" />
        <SlotBox className="h-5 w-12 rounded-xl" />
        <SlotBox className="h-5 w-12 rounded-xl" />
      </div>
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
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children ?? label}
    </div>
  )
}
