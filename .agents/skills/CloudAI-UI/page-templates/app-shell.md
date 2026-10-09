# AppShell 页面外壳

**何时选它**：要做一个带顶栏 + 左侧导航的 CloudAI 产品页面。本节的所有页面模板都套这层外壳，
内容模板只负责填 `PageContent`，不要各自重写顶栏和侧栏。

**抄 [`page-templates/app-shell/app-shell.tsx`](page-templates/app-shell/app-shell.tsx)，看 [`app-shell.reference.tsx`](page-templates/app-shell/app-shell.reference.tsx)
（浮层那块在同目录的 [`nav-popover.reference.tsx`](app-shell/nav-popover.reference.tsx)）。**
把骨架复制进你的页面，按还原件填 `SLOT:`。**不要 `import`，也不要整页抄还原件。**

依赖 `@radix-ui/react-popover`，沿用项目已有版本；未安装时先安装。骨架直接使用其无样式交互层，不替换为带默认外观的弹层。

还原件的侧栏给了两份样本：`sidebar="agent"` 是对话型产品（快捷键、`new` Badge、可折叠历史会话），
`sidebar="console"` 是控制台型（分组标签 + 五组产品内导航，激活态是整项一块 `brand-1` 底）。挑你这页
对的那份填。两份的项取值相同（高 32、`p-2`、图标 16 且用 `secondary-foreground`、gap 8、文字 14），只有左右留白差一档：`agent`
是侧栏内 `px-4`，`console` 是每组 `px-2`。两份侧栏都不放账号行；账号与工作空间入口统一归 TopBar 右侧头像。

下面这些是契约，照抄，不要凭手感重算。

## 结构

```txt
根（h-dvh overflow-hidden，页面渐变底）
└── shell 容器（撑满 viewport，不限宽、不居中）
    ├── TopBar（h-14 常驻不滚）
    │   └── 汉堡 · ProductBrand · 分隔线 · TopBarLabel · 侧栏折叠钮 ┄ TopBarActions
    ├── 主体行（min-h-0 flex-1，左右下外距 12、间隙 8）
    │   ├── Sidebar（w-[15.5rem]，收起时整块不渲染）
    │   │   └── SidebarGroup（min-h-0 flex-1 overflow-y-auto）
    │   └── ContentArea（flex-1 min-w-0，内部 overflow-y-auto）
    │       ├── PageContent
    │       └── 底部渐变遮罩（h-[5.5rem]，pointer-events-none）
    └── NavPopover（浮层，覆盖不挤压）
```

## 不可变量

| 量               | 值                                                      |
| ---------------- | ------------------------------------------------------- |
| `TopBar` 高      | 56（`h-14`），左右内边距 24（`px-6`）                   |
| `Sidebar` 展开宽 | 248（`w-[15.5rem]`）；收起 0，整块移出布局              |
| 主体行外距       | 左右下 12（`px-3 pb-3`），无上外距                      |
| `Sidebar` ↔ 内容 | 间隙 8（`gap-2`）                                       |
| shell 容器       | 撑满 viewport：**不加 `max-w-*`、不加 `mx-auto`**       |
| 圆角             | 面板与浮层 20（`rounded-[1.25rem]`），小件 `rounded-md` |

**`ContentArea` 宽度不写死**，它是 `flex-1` 的结果：`viewport − 24 − 248 − 8`（1920 下 1640、1440 下
1160），侧栏收起时 `viewport − 24`。把这些数写成 `w-[...]` 会让侧栏一收就崩。

**超宽屏两侧不留白边**：外壳撑满，被拉宽的是 `ContentArea`。要限宽的是内容模板里的中央列（首页 680、
概览页 800），不是外壳；给外壳加 `max-w-*` 会在宽屏上出现两条白边，与产品现状不符。

## 插槽

| 插槽                | 允许放                                                                                                                                              | 禁止放                               | 空态                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------ |
| `ProductBrand`      | 整体固定高 28（`h-7`）；包含 28×28 圆角产品 mark + 产品名，单行；mark 固定 `bg-foreground text-background`（亮色模式即黑底白图标）                  | 首字母头像、多行文本、大图           | 不允许为空               |
| `TopBarLabel`       | 上下文标签：Agent 名或面包屑，单行                                                                                                                  | 多级面包屑 + 链接组混排              | 整块隐藏，分隔线一起隐藏 |
| `TopBarActions`     | 2～3 个 32 图标按钮 + 1 个头像；账号与工作空间切换只从头像触发                                                                                      | 侧栏账号入口、文字按钮、下拉直接展开 | 整块隐藏                 |
| `SidebarGroup`      | GroupLabel + N 个菜单项，可带 Badge / 二级                                                                                                          | 图片、卡片、表单                     | 整个 `Sidebar` 塌陷      |
| `PageContent`       | 一个内容模板的根节点                                                                                                                                | 第二个滚动容器                       | 不允许为空               |
| `NavPopoverColumns` | N 列产品分类，列宽 176（`w-44`）、列间距 32（`gap-8`）；每列 GroupLabel + N 个产品项：图标底 32 + 中文名 + 英文副标题**两行**，每项下一条通栏分隔线 | 单列长列表、卡片网格、一行纯文本     | 不渲染浮层与汉堡         |

## 状态

| 状态             | 机制                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `Sidebar-Open`   | 占位，挤压 `ContentArea`                                                                     |
| `Sidebar-Closed` | 宽度归零、整块移出布局。**不是图标栏**，不要留一条图标 rail                                  |
| `NavPopover`     | 点击顶栏汉堡展开 / 收起；再次点击、外部点击、Esc、焦点离开或选择产品时关闭；覆盖、不挤压内容 |

浮层只保留产品分类列，不重复关闭按钮或产品标识。hover 与单独聚焦汉堡不展开。使用非模态
Popover：Esc、选择产品以及首尾 Tab / Shift+Tab 退出后焦点回到汉堡，下一次 Tab 继续访问外部控件；主动聚焦或点击外部控件时不抢回焦点。保留同目录 `nav-popover.keyboard.tsx` 的边界处理，避免 Radix 默认循环 Tab。
填产品项时保留 `onClose`（骨架内可用 `Popover.Close asChild`），再接入业务路由。

侧栏跟随 `matchMedia("(min-width: 90rem)")`：`< 1440` 自动收起，`≥ 1440` 展开。**用户手动开合一次
之后就不再自动变**，刷新才恢复自动跟随。别把它退化成「挂载时读一次」——那样窗口从宽拖窄侧栏不收，
而且首次挂载时读到的宽度还没定尺寸。

## 响应式

目标用户是 Web 端开发者，大屏为主，**最窄兼容 1280**。

| 区域          | ＜1440   | ≥1440        | ≥1920              |
| ------------- | -------- | ------------ | ------------------ |
| `Sidebar`     | 自动收起 | 默认展开 248 | 展开 248           |
| `ContentArea` | `flex-1` | `flex-1`     | `flex-1`，跟着拉宽 |
| `TopBar`      | 不变     | 不变         | 不变，两侧贴边     |

只有一个断点（1440，写 `min-[90rem]:` 或读 `matchMedia`）。超宽档不需要断点：外壳撑满，宽出来的部分
全给 `ContentArea`。

## 增强项

- `TopBar` 里有两个触发器，别合成一个：汉堡开**跨产品导航浮层**，折叠钮开**产品内侧栏**。
- `NavPopover` 是跨产品导航（产品分类 → 产品名），不是 `Sidebar` 的浮层复刻。两者内容不同源。
  产品项写成两行（中文名 + 英文副标题）并带图标底，写成一列纯文本就看不出这层区别了。
- 整页不滚。滚动只发生在 `SidebarGroup` 与 `ContentArea` 内部。给祖先补 `overflow-auto`、或给内滚区
  漏掉 `min-h-0`，都会让内滚失效并被固定高度掩盖过去。
- 底部渐变遮罩是内滚的视觉提示，属 `ContentArea` 层，必须 `pointer-events-none`。
