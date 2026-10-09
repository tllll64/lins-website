/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 overview.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const FEATURES = [
  {
    id: "f1",
    title: "看懂业务，查对数据",
    description:
      "DataWiki 补齐字段语义、业务术语和指标口径，帮助 Agent 选对表、用对口径。",
  },
  {
    id: "f2",
    title: "权限有边界，执行才放心",
    description:
      "按身份授权、按需生效。越权调用在执行前被拦住，而不是事后补救。",
  },
  {
    id: "f3",
    title: "身份可追，数据可控",
    description: "每次调用带独立身份。谁在什么时候用了哪张表，事后能对上。",
  },
]

/**
 * 概览页的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `overview.tsx`。填 SLOT 时对照这里。
 *
 * Hero 左上标题、左下两个 CTA、右侧预览，以及 Features 手风琴 + 截图，都是稿上的样本。
 * 「让 Agent 安全用好企业数据」「购买服务」是占位句，换掉；两栏结构和默认展开第 1 项留下。
 */
export function OverviewReference({
  hasFeatures = true,
}: {
  hasFeatures?: boolean
}) {
  return (
    <div className="flex flex-col p-5">
      <div className="mx-auto flex w-full max-w-[50rem] flex-col gap-12">
        <section className="flex flex-col gap-8">
          <div className="flex min-h-[2.375rem] items-center gap-3 self-start">
            <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
              A
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Agent 数据网关
              </span>
              <span className="text-xs text-muted-foreground">
                100+ Curated Skills for your Agent
              </span>
            </div>
          </div>

          <HeroBanner />
        </section>

        {hasFeatures ? (
          <section className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Features</p>
            <FeatureCards />
          </section>
        ) : null}
      </div>
    </div>
  )
}

function HeroBanner() {
  return (
    <div className="relative flex min-h-40 overflow-hidden rounded-2xl border border-brand-2 bg-card px-8 py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-1 blur-3xl"
      />

      <div className="relative flex max-w-[19rem] flex-1 flex-col justify-between gap-6">
        <p className="text-2xl font-medium leading-8 tracking-wide text-foreground">
          让 Agent 安全用好企业数据
        </p>

        <div className="flex h-6 shrink-0 items-center gap-1">
          <button
            type="button"
            className="inline-flex h-6 items-center rounded-md bg-foreground px-2 text-xs text-background"
          >
            购买服务
          </button>
          <button
            type="button"
            className="inline-flex h-6 items-center rounded-md border border-border bg-card px-2 text-xs text-foreground"
          >
            立即试用
          </button>
        </div>
      </div>

      <div className="relative ml-8 flex min-h-[6.875rem] flex-1 items-center justify-center">
        <div className="rounded-full border border-brand-2 bg-card px-4 py-1.5 text-xs text-foreground shadow-sm">
          独立身份 按需授权
        </div>
      </div>
    </div>
  )
}

function FeatureCards() {
  const [openIndex, setOpenIndex] = React.useState(0)
  const open = FEATURES[openIndex] ?? FEATURES[0]

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      <div className="flex flex-col gap-5 pt-2 xl:w-[18.125rem] xl:shrink-0">
        {FEATURES.map((feature, index) => {
          const expanded = index === openIndex
          return (
            <div key={feature.id} className="flex flex-col gap-5">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpenIndex(index)}
                className="text-left text-sm font-medium text-foreground"
              >
                {feature.title}
              </button>
              {expanded ? (
                <p className="text-xs leading-4 text-foreground/60">
                  {feature.description}
                </p>
              ) : null}
              <span
                aria-hidden
                className={cn(
                  "h-px",
                  expanded
                    ? "bg-gradient-to-r from-brand-2 via-brand-2/40 to-transparent"
                    : "bg-border/40",
                )}
              />
            </div>
          )
        })}
      </div>

      <div className="flex min-h-[19.75rem] flex-1 items-center justify-center rounded-2xl bg-muted/40 p-6">
        <div className="w-full max-w-xs rounded-xl border border-border bg-card p-3 text-left shadow-sm">
          <p className="text-xs font-medium text-foreground">
            Table Name · 3.5MB
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {open.title} 对应的示意图。换成截图，不要只放文字。
          </p>
        </div>
      </div>
    </div>
  )
}
