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
  Atom,
  Book,
  Box,
  ChevronDown,
  CircleHelp,
  CodeXml,
  Database,
  FileText,
  Folder,
  Menu,
  Network,
  PanelLeft,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  SquareActivity,
  WandSparkles,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AvatarPro } from "@/components/ui/avatar-pro"

import { NavPopoverReference } from "./nav-popover.reference"

/**
 * AppShell 的设计稿还原。**只看不抄整页**（PT-022）：
 * 抄改入口是同目录的 `app-shell.tsx`。填某个 SLOT 时对照这里看槽里该长什么样。
 *
 * 侧栏两份样本都是稿上真画过的，不是某个业务的信息架构：
 *
 * - `sidebar="agent"`（Agent chat 首页）：快捷键、`new` Badge、分割线、可折叠的历史会话
 *   分组，会话项右侧带状态点。
 * - `sidebar="console"`（概览页）：GroupLabel + 五组菜单（项数 3 / 4 / 3 / 2 / 1），含激活态
 *   与隐藏项（数据里有、不渲染）。
 *
 * 抄改时留一份，换掉标签与链接，按需删减变体——不要把两份并成两个空盒子。
 *
 * 两份侧栏都不渲染账号行；账号与工作空间入口统一归 TopBar 右侧头像。
 *
 * 「产品名称」「分类名称」以及浮层里的英文副标题是占位句，换掉。
 */
export function AppShellReference({
  contextLabel = "CloudAI Agent Template",
  sidebar = "agent",
  children,
}: {
  contextLabel?: string
  sidebar?: "agent" | "console"
  children?: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const userTookOverRef = React.useRef(false)

  React.useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 90rem)")
    const sync = () => {
      if (!userTookOverRef.current) {
        setSidebarOpen(wideEnough.matches)
      }
    }
    sync()
    wideEnough.addEventListener("change", sync)
    return () => wideEnough.removeEventListener("change", sync)
  }, [])

  const toggleSidebar = () => {
    userTookOverRef.current = true
    setSidebarOpen((open) => !open)
  }

  const [navOpen, setNavOpen] = React.useState(false)

  return (
    <Popover.Root open={navOpen} onOpenChange={setNavOpen}>
      <div className="h-dvh overflow-hidden bg-gradient-to-b from-card via-brand-1 to-brand-2">
        <div className="relative flex h-full w-full flex-col">
          <Popover.Anchor asChild>
            <header className="flex h-14 shrink-0 items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="打开产品导航"
                    className="flex size-8 items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent"
                  >
                    <Menu className="size-4" strokeWidth={1.75} />
                  </button>
                </Popover.Trigger>

                {PRODUCT_BRAND}

                {/* 稿上是一条 6×20 的斜线，不是竖分割线。 */}
                <span
                  aria-hidden
                  className="h-5 w-px rotate-[16deg] bg-border"
                />

                {/* 稿上这行是 brand/11，不是正文色——它标的是「当前在哪个产品/页面」。 */}
                <span className="text-sm font-medium text-brand-11">
                  {contextLabel}
                </span>

                <button
                  type="button"
                  aria-label={sidebarOpen ? "收起侧栏" : "展开侧栏"}
                  aria-pressed={sidebarOpen}
                  onClick={toggleSidebar}
                  className="flex size-8 items-center justify-center rounded-lg text-foreground hover:bg-accent"
                >
                  <PanelLeft className="size-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="帮助"
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <CircleHelp className="size-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="设置"
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Settings2 className="size-4" strokeWidth={1.75} />
                </button>
                <AvatarPro name="Jingjing" variant="gradient" />
              </div>
            </header>
          </Popover.Anchor>

          <div className="flex min-h-0 flex-1 gap-2 px-3 pb-3">
            {sidebarOpen ? (
              <aside className="flex w-[15.5rem] shrink-0 flex-col gap-4 pt-5">
                {sidebar === "agent" ? (
                  <AgentMenuSpecimen />
                ) : (
                  <ConsoleMenuSpecimen />
                )}
              </aside>
            ) : null}

            <main className="relative min-w-0 flex-1 overflow-hidden rounded-[1.25rem] border border-brand-2 bg-background/95 shadow-lg">
              <div className="h-full overflow-y-auto">
                {children ?? (
                  <p className="m-5 text-sm text-muted-foreground">
                    页面内容放这里。
                  </p>
                )}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[5.5rem] bg-gradient-to-b from-transparent to-background"
              />
            </main>
          </div>

          <NavPopoverReference onClose={() => setNavOpen(false)} />
        </div>
      </div>
    </Popover.Root>
  )
}

/**
 * 产品 logo + 名，仅在 TopBar 展示。
 * logo 稿里是一块 28 的圆角方块（前景色底 + 背景色字形，亮色模式即黑底白图标），不是首字母
 * 头像——换成业务自己的 mark 时保持这个尺寸、圆角与前后景关系。
 */
const PRODUCT_BRAND = (
  <div data-slot="product-brand" className="flex h-7 items-center gap-2">
    <span
      aria-hidden
      className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background"
    >
      <svg viewBox="8 8 12 12" fill="currentColor" className="size-3">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 8C17.3137 8 20 10.6863 20 14C20 17.3137 17.3137 20 14 20H8.6792C8.3041 20 8.00003 19.6959 8 19.3208V8.6792C8.00002 8.3041 8.3041 8.00002 8.6792 8H14ZM9.73999 16.5C9.60745 16.5 9.50001 16.6074 9.5 16.74V18.26C9.50001 18.3926 9.60745 18.5 9.73999 18.5H15C15.1381 18.5 15.25 18.3881 15.25 18.25V16.74C15.25 16.6074 15.1426 16.5 15.01 16.5H9.73999Z"
        />
      </svg>
    </span>
    <span className="text-sm font-bold text-foreground">产品名称</span>
  </div>
)

const AGENT_ITEMS: Array<{
  id: string
  label: string
  icon: LucideIcon
  shortcut?: string[]
  badge?: string
}> = [
  { id: "search", label: "搜索", icon: Search, shortcut: ["⌘", "K"] },
  { id: "new-task", label: "新任务", icon: Plus, shortcut: ["⌘", "P"] },
  { id: "data", label: "数据中心", icon: Database, badge: "new" },
  { id: "knowledge", label: "知识中心", icon: Book },
  { id: "skill", label: "技能中心", icon: Wrench },
  { id: "custom-agent", label: "自定义Agent", icon: Atom },
]

const AGENT_HISTORY: Array<{
  id: string
  label: string
  status?: "running" | "failed"
}> = [
  { id: "h1", label: "Top客户画像分析", status: "running" },
  { id: "h2", label: "提供优化方案", status: "failed" },
  { id: "h3", label: "25年销售记录分析" },
]

/** Agent chat 首页那份侧栏：功能入口在上，历史会话在分割线下、可折叠。 */
function AgentMenuSpecimen() {
  const [historyOpen, setHistoryOpen] = React.useState(true)

  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4">
      {AGENT_ITEMS.map((item) => (
        <MenuItemRow key={item.id} icon={item.icon} label={item.label}>
          {item.shortcut ? (
            // 快捷键键帽：18 见方，上下微渐变 + 描边；⌘ 加粗，字母常规。
            <span className="flex items-center gap-1 pr-1">
              {item.shortcut.map((key, index) => (
                <kbd
                  key={key}
                  className={cn(
                    "flex size-[1.125rem] items-center justify-center rounded-md border border-border bg-gradient-to-b from-background to-muted text-xs leading-4 text-muted-foreground",
                    index === 0 && "font-bold",
                  )}
                >
                  {key}
                </kbd>
              ))}
            </span>
          ) : null}
          {item.badge ? (
            <span className="mr-1 flex h-[1.125rem] items-center rounded-md border border-brand-accent-background bg-brand-background px-1.5 text-xs leading-4 text-brand">
              {item.badge}
            </span>
          ) : null}
        </MenuItemRow>
      ))}

      <span aria-hidden className="h-px w-full bg-border" />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          aria-expanded={historyOpen}
          onClick={() => setHistoryOpen((open) => !open)}
          className="flex items-center gap-1 self-start rounded-md p-2 text-xs font-medium leading-4 text-muted-foreground"
        >
          历史会话
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              !historyOpen && "-rotate-90",
            )}
            strokeWidth={1.75}
          />
        </button>

        {historyOpen ? (
          <div className="flex flex-col gap-2">
            {AGENT_HISTORY.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm leading-5 text-foreground hover:bg-sidebar-accent"
              >
                <span className="min-w-0 truncate">{item.label}</span>
                {item.status ? <StatusDot status={item.status} /> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  )
}

/** 会话状态点：12 的环 + 4 的实心点，稿上分「进行中」与「失败」两色。 */
function StatusDot({ status }: { status: "running" | "failed" }) {
  const running = status === "running"
  return (
    <span
      aria-label={running ? "进行中" : "失败"}
      role="img"
      className={cn(
        "flex size-3 shrink-0 items-center justify-center rounded-full border",
        running ? "border-brand-4" : "border-destructive/40",
      )}
    >
      <span
        className={cn(
          "size-1 rounded-full",
          running ? "bg-brand" : "bg-destructive",
        )}
      />
    </span>
  )
}

/**
 * 概览页那份侧栏：五组，项数 3 / 4 / 3 / 2 / 1，激活态在第三组第二项。
 *
 * 菜单项标签全是占位句「产品名称」，所以数据里只留 id / 图标 / 变体。稿上每项都挂着
 * `Sidebar / SidebarMenuSub`，但**整稿都是 hidden**——二级是组件带的能力，展开态没画，
 * 所以这里也不渲染。`hidden` 那条演示「数据里有、不渲染」。
 */
const CONSOLE_GROUPS: Array<{
  id: string
  items: Array<{
    id: string
    icon: LucideIcon
    label?: string
    active?: boolean
    hidden?: boolean
  }>
}> = [
  {
    id: "g1",
    items: [
      { id: "g1-a", icon: Database },
      { id: "g1-b", icon: ShieldCheck },
      { id: "g1-c", icon: SquareActivity },
    ],
  },
  {
    id: "g2",
    items: [
      { id: "g2-a", icon: Folder },
      { id: "g2-b", icon: Workflow },
      { id: "g2-hidden", icon: FileText, label: "隐藏项", hidden: true },
      { id: "g2-c", icon: Box },
      { id: "g2-d", icon: FileText },
    ],
  },
  {
    id: "g3",
    items: [
      { id: "g3-a", icon: Wrench },
      { id: "g3-b", icon: WandSparkles, active: true },
      { id: "g3-c", icon: Sparkles },
    ],
  },
  {
    id: "g4",
    items: [
      { id: "g4-a", icon: Network },
      { id: "g4-b", icon: CodeXml },
    ],
  },
  { id: "g5", items: [{ id: "g5-a", icon: Workflow }] },
]

function ConsoleMenuSpecimen() {
  return (
    // 组自带 px-2 pt-1 pb-2，所以这份侧栏的左右留白比 Agent 那份（px-4）窄一档。
    <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
      {CONSOLE_GROUPS.map((group) => (
        <div key={group.id} className="flex flex-col px-2 pb-2 pt-1">
          <p className="flex h-8 items-center px-2 text-xs font-medium leading-4 text-secondary-foreground opacity-70">
            分类名称
          </p>
          <div className="flex flex-col gap-1">
            {group.items
              .filter((item) => !item.hidden)
              .map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-lg",
                    // 激活态是整项一块 brand-1 底，不是文字变色。
                    item.active && "bg-brand-1",
                  )}
                >
                  <MenuItemRow
                    icon={item.icon}
                    label={item.label ?? "产品名称"}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

/** 两份侧栏样本共用的菜单项：高 32、图标 16、gap 8，右侧挂 Badge / 快捷键 / 二级箭头。 */
function MenuItemRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex h-8 items-center gap-2 rounded-md p-2 text-sm leading-none text-sidebar-foreground hover:bg-sidebar-accent">
      <Icon
        data-slot="sidebar-menu-icon"
        className="size-4 shrink-0 text-secondary-foreground"
        strokeWidth={1.75}
      />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {children}
    </div>
  )
}
