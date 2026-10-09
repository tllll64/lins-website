# CloudAI Components

> 样式 / token 规则不在本文——写 className 前先读 `design-system.md`。
> **按需读**:先用「场景 → 组件」定位名字,再只读 `components/<kebab-name>.md`,不要通读全部文件。

## Registry 接入

```bash
npx shadcn@3 registry add @cloudai=https://o.alicdn.com/cloudai/cloudai/v3/r/default/{name}.json
```

> `{name}` 是 URL 占位符,原样保留。**务必锁 `shadcn@3`**(裸 `npx shadcn` 会拉到 v4)。
> 安装后落在 `components/ui`;import 保持 `@/components/ui/*`。
> `className` 用 `cn()` 合并;未列出的原生/Radix props 默认可透传。

### 本仓 Tailwind 配了 prefix 的话

**不要**在 `components.json` 里填 `tailwind.prefix`。实测 `shadcn@3` 按它改写时写出的是
Tailwind v4 语法(`tw-:flex`,前缀在最前且在 variant 之前),在 **v3** 下一条规则都不生成——
配置看着生效、样式全丢。

正确做法是装完源码后跑一次自己的 `applyPrefix`,且这份脚本必须是 CloudAI UI 仓
`tools/tw-prefix.ts` 的实现(暂时手动同步过去,尚未随 CLI 下发)。上游 shadcn 那份(以及从它拷出来的旧 `applyPrefix.cjs`)有五处
会**改坏**类名:命名 group(`group-hover/att:`)、`!` 的位置、arbitrary property
(`[--tw-scale:1]`)、任意值里第二个 `/` 之后被截断(`shadow-[…/0.3),…/0.02)]`)、任意变体里的
引号被吃(`[stroke='#fff']`)。实测旧脚本会打掉 `rich-link` 的图标投影与 `chart-pro` 的
recharts 覆盖样式共 7 个类,且不报错。

## 文案默认为英文,按需本地化(DEC-021)

Registry 组件的可见默认文案统一英文(`placeholder` / `selectPlaceholder` 默认空字符串)。安装后请用本地仓库的国际化方案显式传入对应 props 覆盖。

## 场景 → 组件(先查这里)

| 场景                                                            | 用这个                                                                                                          | 不要                                                                                 |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 列表页（默认）                                                  | `DataTablePro`(自研)                                                                                            | 手搓 toolbar + 表格 + 分页组合或吞并式黑盒                                           |
| 数据表格深度定制 / 改编排                                       | `DataTable` + `useDataTable` 组合；页面层级与布局分别读 `design-system/hierarchy.md`、`design-system/layout.md` | 仅依赖 `DataTablePro` 硬改内部排版                                                   |
| 给图标按钮 / 截断文本加 hover 说明                              | `SimpleTooltip`(自研)                                                                                           | 自己拼 `Tooltip`+`Provider`+`Trigger`+`Content` 样板                                 |
| 需要懒加载且切换后保留状态的页签                                | `TabsPro`(自研)                                                                                                 | 自己用状态和 `display:none` 手搓 Tabs                                                |
| 密码输入框(显隐切换)                                            | `PasswordInput`(自研)                                                                                           | 自己包 Input + Eye 按钮                                                              |
| 表格行内展开键值详情                                            | `CollapsedInfo`(自研)                                                                                           | 自己拼 Popover + 信息列表                                                            |
| 列表 / 卡片区域刷新按钮                                         | `RefreshButton`(自研)                                                                                           | 自己写 spin + border 样式                                                            |
| 内容区加载蒙层（保留旧内容）                                    | `LoadingOverlay`(自研)                                                                                          | 手搓 absolute 蒙层 + spin 图标                                                       |
| 带状态色的进度条                                                | `ProgressPro`(自研)                                                                                             | 手搓 div + 自己算百分比                                                              |
| 数据驱动动态尺寸的图标                                          | `SvgIcon`(自研)                                                                                                 | 到处写内联 width/height                                                              |
| 状态消息弹窗 / 命令式提示                                       | `MessagePrompt`(自研)                                                                                           | 自己拼 Dialog + 状态图标 + createRoot                                                |
| 增强下拉（单选/多选/搜索/异步）                                 | `SelectProV2`(自研)                                                                                             | 业务仓旧 `select-pro` 或手搓 Command+Popover                                         |
| 只要选择列表面板 / 异步 options hook（无触发器）                | `command-card` 族(自研)                                                                                         | 标准下拉用 SelectProV2；AI `/` `@` 菜单用 AiQuickCommand                             |
| 筛选组（多条件 Popover 组合）                                   | `FilterGroupV2`                                                                                                 | 业务仓旧 `filter-group`                                                              |
| 列表/表格分页（三档）                                           | `PaginationPro`(自研)                                                                                           | 手搓分页按钮 + 省略号算法                                                            |
| 列表/卡片视图切换                                               | `ViewSwitch`(自研)                                                                                              | 用 tabs-pro 或手搓 button group                                                      |
| 数据表格（排序/选择/锁列/列宽/列序/列设置）                     | `DataTable` + `useDataTable`(自研)                                                                              | 手搓表格状态机或吞并 columns/dataSource 黑盒                                         |
| 表格多选批量操作浮层                                            | `SelectionBar`(自研)                                                                                            | 自己拼 fixed 底栏 + 计数                                                             |
| 表格列设置（显隐 + 拖拽排序）                                   | `ColumnSettings`(自研)                                                                                          | 自己拼 Popover + checkbox + dnd                                                      |
| 常见列渲染（省略/tooltip/标签/时间/状态/链接/操作）             | `TextCell`/`TagsCell`/`TimeCell`/`StatusCell`/`LinkCell`/`ActionsCell`                                          | 手搓 className 或硬编码 hex                                                          |
| AI 执行计划展示（步骤 + 确认条）                                | `AiPlanCard`(自研)                                                                                              | 手搓折叠列表或依赖 assistant-ui 绑定 runtime 的组件                                  |
| AI 任务执行链展示（节点 + 连线 + 子任务）                       | `AiChain`(自研)                                                                                                 | 手搓时间线/步骤条或依赖 assistant-ui 绑定 runtime 的组件                             |
| AI 消息流深度思考 / 工具调用行                                  | `AiThinking` / `AiToolCall`（`ai-trace`）                                                                       | `AiChainReasoningCard` / `AiChainTaskBar`（链内形态）或手搓折叠条                    |
| AI 对话输入框（行内 pill 混排 + 发送/停止 + 工具栏 + 附件插槽） | `AiPromptInput`(自研)                                                                                           | 手搓 contentEditable/textarea + 按钮组合或依赖 assistant-ui 绑定 runtime 的 Composer |
| 对话详情页的单行追问入口（聚焦后展开成多行输入框）              | `AiPromptInput` 传 `collapsible`                                                                                | 另做一个单行组件，或用 Input + 按钮拼一个假输入框                                    |
| AI 附件展示（文件/图片/引用）                                   | `AiAttachment` 族(自研)                                                                                         | 手搓附件卡片或依赖 assistant-ui 绑定 runtime 的 attachment 组件                      |
| AI 快捷指令 / @ 对象选择菜单                                    | `AiQuickCommand` 族(自研)                                                                                       | 手搓菜单面板 + 自研键盘导航,或依赖 assistant-ui 绑定 runtime 的组件                  |
| 实体/资源卡片（图标标题 + 开关/操作 + 底部信息收起）            | `ResourceCard` / `ResourceCardGrid` / `ResourceCardCreate`(自研)                                                | 手搓 card + switch + 操作区 + popover 组合                                           |
| 引擎类型图标（后端类型字符串驱动）                              | `EngineIcon`(自研)                                                                                              | 塞进 `EntityIdentity`、并进 `@cloudai/icons`、或手搓 SVG                             |
| 资源身份（引擎图 + 主名称 + 辅助 ID / 状态属性）                | `EntityIdentity`(自研)                                                                                          | 用人的头像组件，或手搓图标+两行字                                                    |
| 单独显示用户头像（首字 / 用户图标 / 自动渐变 / 照片）           | [`AvatarPro`](components/avatar-pro.md)(自研)                                                                   | 产品、资源和引擎身份不要使用；头像 + 名称组合用 `UserIdentity`                       |
| 人的身份（头像 + 显示名 + 可选账号）                            | `UserIdentity`(自研)                                                                                            | 用 `EntityIdentity` 或手搓头像+两行字                                                |
| 状态 pill（六档状态色 + 图标/圆点）                             | `StatusBadge`(自研)                                                                                             | 手搓三 token pill 或官方 `badge`                                                     |
| 整行风险/提示条（非 toast）                                     | `MessageBar` 族(自研)                                                                                           | 手搓 alert 条                                                                        |
| 代码块 / 终端 / 代码+结果表                                     | `CodeBlock` 族(自研)                                                                                            | 焊死 Shiki/prism 的黑盒代码组件；行内记号用 InlineMarkup                             |
| 句子中间标字段名 / 状态值 / 实例 ID（反引号码片）               | `InlineMarkup`(自研)                                                                                            | 手搓 markdown 解析或再写一份码片样式；整条 SQL / 多行代码用 CodeBlock                |
| 单指标卡（标签 + 大数字）                                       | `MetricCard`(自研)                                                                                              | 为指标卡背 recharts；或手搓 brand 标签卡                                             |
| 坐标轴图表（柱/线/饼 + tooltip）                                | `ChartPro`(自研，recharts v2)                                                                                   | 官方 shadcn `chart`（v4 + recharts v3，不兼容）                                      |
| 关联产品 / Agent 富跳转入口                                     | `RichLink` 族(自研)                                                                                             | 手搓渐变卡 + 外链箭头                                                                |
| 单个简单下拉                                                    | shadcn `Select`(原生)                                                                                           | 需要异步缓存/多选 tag 时用 SelectProV2                                               |
| 浮层 / 气泡卡片容器                                             | shadcn `Popover`(原生)                                                                                          | 自研                                                                                 |

## 组件 → 文件索引

清单由 registry 生成,见 `components/component-index.md`——
它列出每个组件的导出名、文档文件与安装命令。定位到组件名后**只读对应文件**,不要通读。
