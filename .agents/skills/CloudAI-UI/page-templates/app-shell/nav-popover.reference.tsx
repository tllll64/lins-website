/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 这是设计稿还原（参考件）。填 SLOT 时对照这份看槽里该长什么样。
 * 不要整页抄它当业务页面——抄改入口是同目录的 app-shell.tsx。
 * 里面的「产品名称」「场景案例标题」是占位句，换掉；变体种类按需删减。
 */
"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import {
  Flag,
  Folder,
  Network,
  Puzzle,
  ShieldCheck,
  SquareActivity,
  Store,
  WandSparkles,
  type LucideIcon,
} from "lucide-react"
import { closeNavAtTabBoundary } from "./nav-popover.keyboard"

type NavProduct = { id: string; subtitle: string; icon: LucideIcon }

const GATEWAY_PRODUCTS: NavProduct[] = [
  { id: "gateway", subtitle: "Data Gateway", icon: ShieldCheck },
  { id: "meta", subtitle: "Meta Agent", icon: Folder },
  { id: "sql", subtitle: "SQL Console", icon: SquareActivity },
  { id: "rag", subtitle: "RAG Flow", icon: Puzzle },
]

const AGENT_PRODUCTS: NavProduct[] = [
  { id: "data-agent", subtitle: "Data Agent", icon: Network },
  { id: "meta-agent", subtitle: "Meta Agent", icon: WandSparkles },
  { id: "managed", subtitle: "Managed Data Agent", icon: Flag },
  { id: "market", subtitle: "Data Skill Market", icon: Store },
]

/** 稿上四列，前两列与后两列各是同一份产品清单——列数与列内条数都按业务实际改。 */
const NAV_COLUMNS = [
  { id: "c1", products: GATEWAY_PRODUCTS },
  { id: "c2", products: GATEWAY_PRODUCTS },
  { id: "c3", products: AGENT_PRODUCTS },
  { id: "c4", products: AGENT_PRODUCTS },
]

/**
 * `NavPopover` 的设计稿还原，配 `app-shell.reference.tsx` 一起看。**只看不抄整页**（PT-022）。
 *
 * 它承载**跨产品导航**（产品分类 → 产品），与 Sidebar 的产品内导航是两套东西，不是 Sidebar
 * 的浮层复刻。所以：
 *
 * - 产品项是**两行**——中文名 + 英文副标题，左边一块 32 的图标底，项与项之间一条分隔线。
 *   退化成一列纯文本就丢掉了稿的信息层级。
 * - 不重复 TopBar 的产品标识与关闭按钮；点击汉堡、外部、Esc 或焦点离开时收起。
 * - 浮层覆盖、不挤压 ContentArea，所以由外壳挂在 shell 容器上而不是主体行里。
 *
 * 「产品名称」「产品分类」与英文副标题都是占位句，换掉。
 */
export function NavPopoverReference({ onClose }: { onClose: () => void }) {
  return (
    <Popover.Content
      aria-label="产品导航"
      onKeyDown={(event) => closeNavAtTabBoundary(event, onClose)}
      align="start"
      alignOffset={12}
      side="bottom"
      avoidCollisions={false}
      className="z-20 flex flex-col gap-4 rounded-[1.25rem] bg-popover p-5 shadow-[0.25rem_0.25rem_1rem_0_rgb(0_0_0/0.08)] outline-none"
    >
      {/* 稿上列宽 180、列距 34，四列合 822 —— 浮层总宽 862 是量出来的，不要改成自适应。 */}
      <div className="flex gap-[2.125rem]">
        {NAV_COLUMNS.map((column) => (
          <div key={column.id} className="flex w-[11.25rem] flex-col gap-6">
            <p className="font-mono text-[0.625rem] uppercase leading-none tracking-[0.04em] text-muted-foreground">
              产品分类
            </p>
            <div className="flex flex-col gap-4">
              {column.products.map(({ id, subtitle, icon: Icon }) => (
                <React.Fragment key={id}>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {/* 稿上是一套 filled 图标；lucide 只有描边版，所以描边加粗一档补重量。 */}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.625rem] bg-brand-background text-brand">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1 text-xs leading-none tracking-[0.04em]">
                      <span className="truncate text-accent-foreground">
                        产品名称
                      </span>
                      <span className="truncate text-muted-foreground">
                        {subtitle}
                      </span>
                    </span>
                  </button>
                  <span aria-hidden className="h-px w-full bg-border" />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Popover.Content>
  )
}
