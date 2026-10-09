/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/overview.md，改之前先读它。
 * 填 SLOT 时对照同目录 overview.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** 稿：默认展开第 1 项；同时只展开一项；**不提供全部收起**。 */
const FEATURE_TITLES = [
  "看懂业务，查对数据",
  "权限有边界，执行才放心",
  "身份可追，数据可控",
]

/**
 * 概览页的内容子树。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 它只负责 `AppShell` 的 `PageContent` 插槽那一块，**不复制外壳**（PT-015）——
 * TopBar / Sidebar / 内容区滚动容器都在 `app-shell.tsx` 里，先抄那份。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - 内容列 800（`max-w-[50rem]`），比首页的 680 宽。**这是刻意区分的**：首页是对话输入场景，
 *   窄列聚焦打字区；概览页是阅读浏览场景，宽列适合图文并排。别把两页统一成一个宽度。
 * - **顶对齐顺序滚动，不垂直居中。** 这点和首页相反：首页那一屏内容少、要居中，概览页是
 *   Hero → Features → 未来更多 Section 的阅读流。
 * - Features 的两栏 ↔ 堆叠是 `xl:`（1280）**媒体查询**，不是容器查询。800 的列在 1024 下也放得下
 *   两栏，所以这条降级只能靠断点触发，别改成 `flex-wrap`。
 * - `HeroBanner` 里的装饰图形要溢出容器，所以容器必须 `overflow-hidden`；少了它装饰会撑破圆角。
 *
 * 不可变量、插槽的允许放与空态、状态机制、响应式与滚动归属，全部逐条写在同目录的
 * `overview.md` 里。**照抄，不要重算。**
 */
export function Overview({
  hasFeatures = true,
}: {
  /** false = 无功能空态：整个 FeaturesSection 连段标题一起不渲染。 */
  hasFeatures?: boolean
}) {
  return (
    <div className="flex flex-col p-5">
      {/* 内容列：Hero 与 Features 同宽 800 居中。顶对齐，内容长了由外壳的滚动容器接管。 */}
      <div className="mx-auto flex w-full max-w-[50rem] flex-col gap-12">
        <section className="flex flex-col gap-8">
          {/* SLOT:AgentBadge —— 头像 + Agent 名称；禁止多行描述、链接、操作按钮 */}
          <SlotBox
            label="AgentBadge"
            className="min-h-[2.375rem] w-64 self-start"
          />

          <HeroBanner />
        </section>

        {/* 无功能：整段连段标题一起不渲染，不留空位。 */}
        {hasFeatures ? (
          <section className="flex flex-col gap-4">
            {/* SLOT:SectionLabel —— 段标题单行（稿上是 `Features`）；禁止多级面包屑、链接组 */}
            <SlotBox
              label="SectionLabel"
              className="min-h-5 justify-start border-none px-0"
            />

            <FeatureCards />
          </section>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Hero：容器与内部布局都是固定的，只有三块内容是插槽。
 * 标题在左上、CTA 贴左下、数据面板预览在右——`justify-between` 撑开上下，别改成手写间距。
 */
function HeroBanner() {
  return (
    <div className="relative flex min-h-40 overflow-hidden rounded-2xl border border-brand-2 bg-card px-8 py-6">
      {/* 装饰层：要溢出容器边界，靠父级的 overflow-hidden 裁。抄改时换成真背景图。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-1 blur-3xl"
      />

      <div className="relative flex max-w-[19rem] flex-1 flex-col justify-between gap-6">
        {/* SLOT:HeroTitle —— 主标题，最多两行；禁止长文本段落 */}
        <SlotBox label="HeroTitle" className="min-h-8 border-none px-0" />

        {/* SLOT:HeroActions —— 恰好 2 个 CTA，各高 24；禁止多于 2 个 */}
        <div className="flex h-6 shrink-0 items-center gap-1">
          <SlotBox label="HeroActions" className="h-6 w-20" />
          <SlotBox className="h-6 w-20" />
        </div>
      </div>

      {/* SLOT:HeroPanelPreview —— 右侧数据面板预览；空态整块隐藏，标题与 CTA 留下 */}
      <SlotBox
        label="HeroPanelPreview"
        className="relative ml-8 min-h-[6.875rem] flex-1 rounded-2xl"
      />
    </div>
  )
}

/**
 * Features：左栏手风琴 + 右栏预览，展开项联动右栏。
 *
 * `xl:` 之下堆叠成一列，预览在文字下方——所以预览必须写在 DOM 里的第二位，靠 `flex-col` 自然
 * 落到下方，不要用 `order-*` 去搬。
 */
function FeatureCards() {
  // 默认展开第 1 项；点已展开的那项不收起——稿明确不提供全部收起。
  const [openIndex, setOpenIndex] = React.useState(0)

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      <div className="flex flex-col gap-5 pt-2 xl:w-[18.125rem] xl:shrink-0">
        {FEATURE_TITLES.map((title, index) => {
          const open = index === openIndex
          return (
            <div key={title} className="flex flex-col gap-5">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(index)}
                className="text-left text-sm font-medium text-foreground"
              >
                {title}
              </button>

              {/* SLOT:FeatureItem —— 展开项的描述，最多 5 条；禁止纯文字无截图的整段 */}
              {open ? (
                <SlotBox
                  label="FeatureItem"
                  className="min-h-8 border-none px-0"
                />
              ) : null}

              {/* 展开项的分割线是高亮渐变，未展开是普通细线 */}
              <span
                aria-hidden
                className={cn(
                  "h-px",
                  open
                    ? "bg-gradient-to-r from-brand-2 via-brand-2/40 to-transparent"
                    : "bg-border/40",
                )}
              />
            </div>
          )
        })}
      </div>

      {/* SLOT:FeaturePreview —— 截图 / 示意图，随展开项切换；禁止纯文字 */}
      <SlotBox
        key={openIndex}
        label={`FeaturePreview · 第 ${openIndex + 1} 项`}
        className="min-h-[19.75rem] flex-1 rounded-2xl bg-muted/40"
      />
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
