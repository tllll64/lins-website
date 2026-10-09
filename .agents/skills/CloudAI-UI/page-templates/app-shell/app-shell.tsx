/*
 * CloudAI UI 页面模板的分发副本。抄进你自己的页面后随便改，那正是模板的用途。
 *
 * 抄进你自己的页面之后随便改，那正是页面模板的用途。契约（不可变量 / 插槽 / 状态 /
 * 响应式 / 滚动归属）见 page-templates/app-shell.md，改之前先读它。
 * 填 SLOT 时对照同目录 app-shell.reference.tsx，不要对着空盒子自己发明结构。
 */
"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"
import { CircleHelp, Menu, PanelLeft, Settings2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { closeNavAtTabBoundary } from "./nav-popover.keyboard"

/**
 * CloudAI 页面外壳。**抄改物料，不要 import**（PT-001）：
 * 复制本文件到业务里，把 `SLOT:` 注释下面的占位块替换成真实内容。
 *
 * 本文件钉的是「AI 一次性生成必错」的那几件事，抄改时不要动：
 *
 * - 整页不滚：根节点 `h-dvh overflow-hidden`，滚动只发生在 Sidebar 与 ContentArea 内部。
 *   任何祖先补 `overflow-auto` 都会让这两个内滚区失效。
 * - `min-h-0` / `min-w-0`：flex 子项默认不肯缩到内容以下，缺了它们内滚区会被内容顶开，
 *   然后往往被固定高度掩盖过去。
 * - 外壳撑满 viewport：**不要加 `max-w-*` 或 `mx-auto`**，超宽屏上被拉宽的是 ContentArea，
 *   两侧不留白边（PT-031）。ContentArea 宽度是 `flex-1` 的结果，不写死（PT-011）。
 * - Sidebar 收起是宽度归零、整块移出布局，**不是图标栏**。
 *
 * 不可变量、插槽的允许放与空态、状态机制、响应式与滚动归属，全部逐条写在同目录的
 * `app-shell.md` 里。**照抄，不要重算**——那些数字是从设计稿对过账的，看着像可以凭手感调，
 * 一调就是侧栏一收布局崩、或者整页跟着滚。
 */
export function AppShell({ children }: { children?: React.ReactNode }) {
  // 侧栏跟随 `(min-width: 90rem)`（1440），直到用户手动开合一次为止——那之后由用户说了算，
  // 刷新才恢复自动。`userTookOverRef` 就是稿上「手动展开后不再自动收起，直到刷新页面」。
  //
  // 别改成「挂载时只读一次」：稿的响应式表是逐档给侧栏状态的，那是条活规则；只读一次的话，
  // 窗口从宽拖窄侧栏不会收，而且首次挂载时容器还没定尺寸时读到的宽度是错的。
  // 也别放进 useState 初值：读 window 会让 SSR 与首次 hydration 不一致。
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
          {/* ── TopBar：常驻不滚，高 56 ─────────────────────────────── */}
          <Popover.Anchor asChild>
            <header className="flex h-14 shrink-0 items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="打开产品导航"
                    className="flex size-8 items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent"
                  >
                    <Menu className="size-4" />
                  </button>
                </Popover.Trigger>

                {/* SLOT:ProductBrand —— 只换 SVG glyph 与产品名；保留 28×28 黑底白图标的外框 */}
                {PRODUCT_BRAND}

                <span aria-hidden className="h-5 w-px bg-border" />

                {/* SLOT:TopBarLabel —— 上下文标签：Agent 名或面包屑，单行 */}
                <SlotBox label="TopBarLabel" className="h-5 w-48" />

                <button
                  type="button"
                  aria-label={sidebarOpen ? "收起侧栏" : "展开侧栏"}
                  aria-pressed={sidebarOpen}
                  onClick={toggleSidebar}
                  className="flex size-8 items-center justify-center rounded-md text-foreground hover:bg-accent"
                >
                  <PanelLeft className="size-4" />
                </button>
              </div>

              {/* SLOT:TopBarActions —— 右侧图标区，每个 32、间距 8 */}
              <div className="flex items-center gap-2">
                <SlotBox className="size-8">
                  <CircleHelp className="size-4" />
                </SlotBox>
                <SlotBox className="size-8">
                  <Settings2 className="size-4" />
                </SlotBox>
                <SlotBox className="size-8 rounded-full" />
              </div>
            </header>
          </Popover.Anchor>

          {/* ── 主体行：左右下外距 12、间隙 8，无上外距 ──────────────── */}
          <div className="flex min-h-0 flex-1 gap-2 px-3 pb-3">
            {/* ── Sidebar：常驻，菜单溢出时自己内滚；收起时整块不渲染 ── */}
            {sidebarOpen ? (
              <aside className="flex w-[15.5rem] shrink-0 flex-col gap-4 pt-5">
                {/* SLOT:SidebarGroup —— GroupLabel + N 个菜单项；无菜单时整个 Sidebar 塌陷 */}
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4">
                  <SlotBox label="SidebarGroup" className="h-40 shrink-0" />
                  <SlotBox className="h-40 shrink-0" />
                </div>
              </aside>
            ) : null}

            {/* ── ContentArea：唯一的主滚动容器 ───────────────────────── */}
            <main className="relative min-w-0 flex-1 overflow-hidden rounded-[1.25rem] border border-brand-2 bg-background/95 shadow-lg">
              <div className="h-full overflow-y-auto">
                {/* SLOT:PageContent —— 内容模板挂这里，见 page-templates/ 下各页。
                  抄改时把内容直接写在这里；`children` 只是让内容模板的 story 能装进真外壳，
                  好在真实宽度下看响应式（PT-019）。内容自己带 padding 20。 */}
                {children ?? (
                  <SlotBox label="PageContent" className="m-5 h-[45rem]" />
                )}
              </div>

              {/* 底部渐变遮罩：内滚的视觉提示，属 ContentArea 层，不吃指针事件 */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[5.5rem] bg-gradient-to-b from-transparent to-background"
              />
            </main>
          </div>

          <NavPopover onClose={() => setNavOpen(false)} />
        </div>
      </div>
    </Popover.Root>
  )
}

const PRODUCT_BRAND = (
  <div data-slot="product-brand" className="flex h-7 items-center gap-2">
    <span
      data-slot="product-mark"
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

/**
 * 一级导航浮层：点击 TopBar 汉堡开合，承载**跨产品导航**（产品分类 → 产品名）。
 * 与 Sidebar 的产品内导航是两套东西，不是 Sidebar 的浮层复刻。
 * 浮层覆盖、不挤压 ContentArea，所以挂在 shell 容器上而不是主体行里。
 */
function NavPopover({ onClose }: { onClose: () => void }) {
  return (
    <Popover.Content
      aria-label="产品导航"
      onKeyDown={(event) => closeNavAtTabBoundary(event, onClose)}
      align="start"
      alignOffset={12}
      side="bottom"
      avoidCollisions={false}
      className="z-20 flex flex-col gap-4 rounded-[1.25rem] bg-popover p-5 shadow-xl outline-none"
    >
      {/* SLOT:NavPopoverColumns —— N 列产品分类，列间距 32；每列 GroupLabel + N 个产品项 */}
      <div className="flex gap-8">
        <SlotBox label="NavPopoverColumns" className="h-64 w-44" />
        <SlotBox className="h-64 w-44" />
        <SlotBox className="h-64 w-44" />
        <SlotBox className="h-64 w-44" />
      </div>
    </Popover.Content>
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
