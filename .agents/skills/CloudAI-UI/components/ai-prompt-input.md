# AiPromptInput

- **何时用**:AI Chat 的主交互入口(对话输入框)——默认使用静态 brand 聚焦描边;需要强化 AI 主交互入口时,在 Root 显式传 `borderEffect="beam"` 启用描边光束。光束聚焦时启动、失焦淡出;`prefers-reduced-motion: reduce` 下关闭运动、保留静态焦点描边。其余包含自适应高度**行内 pill 混排输入区**(52~240px,超出内滚;基于原生 `contentEditable` + Selection/Range,无编辑器内核,DEC-038)+ 底部功能区插槽 + 发送/停止圆钮 + 辅助文本 + 附件插槽行。复合组件族:`AiPromptInput` / `AiPromptInputTextarea` / `AiPromptInputAttachments` / `AiPromptInputToolbar` / `AiPromptInputToolbarButton` / `AiPromptInputSubmit` / `AiPromptInputHelperText`;`AiPromptInputTextarea` 经 `ref` 暴露命令式句柄 `AiPromptInputTextareaHandle`(`insertPill` / `updatePill` / `removePill` / `reset` / `getSegments` / `focus`)。
- **安装**:`npx shadcn@3 add @cloudai/ai-prompt-input --overwrite`(目录 item,多文件;从旧版单文件升级须带 `--overwrite`)。
- **导入**:`import { AiPromptInput, AiPromptInputTextarea, AiPromptInputToolbar, AiPromptInputToolbarButton, AiPromptInputSubmit, AiPromptInputHelperText, AiPromptInputAttachments } from '@/components/ui/ai-prompt-input'`。
- **依赖**:`lucide-react`、`@radix-ui/react-use-controllable-state`;registry 依赖 `@cloudai/simple-tooltip`、`@cloudai/ai-attachment`(行内 attachment 形态复用 `AiAttachmentChip`)。
- **关键 props**:
  | prop                                                | 类型                              | 说明                                                                                                                                                                                        |
  | --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `value` / `defaultValue` / `onValueChange`          | Root,`string`                     | 输入值,受控/非受控均可(useControllableState)                                                                                                                                                |
  | `status`                                            | Root,`'idle' \| 'running'`        | 生成状态由业务传入,默认 `idle`;`running` 时发送钮变停止钮(不因 value 为空而禁用)                                                                                                            |
  | `onSubmit`                                          | Root,`(value) => void`            | Enter 或点击发送触发;组件保证 trim 后非空才触发;running 期间 Enter 不发送                                                                                                                   |
  | `onStop`                                            | Root,`() => void`                 | running 态点击停止钮触发                                                                                                                                                                    |
  | `disabled`                                          | Root,`boolean`                    | 整体禁用(输入 + 全部按钮)                                                                                                                                                                   |
  | `borderEffect`                                      | Root,`'none' \| 'beam'`           | 描边效果,默认 `none`;普通档聚焦有 2px Brand 外环,`beam` 聚焦时由彩色描边、内光与 bloom 单独承担反馈,不叠加外环                                                                              |
  | `collapsible`                                       | Root,`boolean`                    | 单行收起形态(DEC-104),默认 `false`。未聚焦且内容为空时压成 52px 胶囊(功能按钮 · 占位文案 · 28px 发送钮),聚焦或有内容时形变回多行;用于对话详情页的追问入口                                   |
  | `expanded` / `defaultExpanded` / `onExpandedChange` | Root,`boolean`                    | 受控展开态,仅 `collapsible` 下有意义;**内容非空时恒为展开**,该 prop 压不回去                                                                                                                |
  | `placeholder`                                       | Textarea,`string`                 | 默认 `""`(DEC-021);受控切换即时生效,无内置过渡动画                                                                                                                                          |
  | `defaultSegments`                                   | Textarea,`AiPromptInputSegment[]` | 初始内容 segments(text/pill 混排);未提供时按 Root 初始 `value` 生成纯文本 segment。**无受控 `segments` prop**——内容随后归 DOM,经 handle 命令式改写                                          |
  | `onPillClick`                                       | Textarea,`(pill, host) => void`   | 点击 pill 触发;`host` 为宿主 span,供业务浮层 anchor 定位;空槽补全与已填改绑均走此回调。**只吞掉「真正拖动过的那一次」pointer 序列自带的 click**,拖拽结束后的下一次点击即正常开浮层(DEC-066) |
  | `renderPillIcon`                                    | Textarea,`(pill) => ReactNode`    | 换 pill 内图标(主扩展,DEC-040);不传则无 icon                                                                                                                                                |
  | `renderPill`                                        | Textarea,`(ctx) => ReactNode`     | 整颗自定义 pill(逃逸舱);日常应靠 `variant`/`status` 默认皮。**返回内容须保持 24px 高**(=编辑器 `leading-6`),否则该行行盒被撑高、同行其他 pill 会随之上移(DEC-066)                           |
  | `ref` → `AiPromptInputTextareaHandle`               | Textarea                          | `insertPill(pill)` / `updatePill(id, {label?, value?, variant?, status?})` / `removePill` / `reset` / `getSegments` / `focus`                                                               |
  | `disabled`                                          | Textarea,`boolean`                | 单独禁用输入区(与 Root `disabled` 取或)                                                                                                                                                     |
  | `active` / `tooltip`                                | ToolbarButton                     | `active` 开关态(brand 色 + `aria-pressed` + `data-active`);`tooltip` 提供时内部包 SimpleTooltip;图标经 children 传入                                                                        |
  | `icon` / `stopIcon`                                 | Submit,`ReactNode`                | 覆盖 idle/running 态图标,默认 lucide `ArrowUp` / 实心 `Square`;三派生态(disabled/ready/running)自动切换并暴露 `data-status`                                                                 |
  | `variant`                                           | HelperText,`'info' \| 'error'`    | 灰色提示 / 红色报错,渲染在容器外下方,无默认文案                                                                                                                                             |
- **最小示例**:

```tsx
<AiPromptInput
  value={value}
  onValueChange={setValue}
  status={isGenerating ? 'running' : 'idle'}
  onSubmit={(v) => sendMessage(v)}
  onStop={() => stop()}
>
  <AiPromptInputTextarea placeholder="输入你想分析的内容,按 Enter 发送" />
  <AiPromptInputToolbar>
    <AiPromptInputToolbarButton tooltip="上传附件" onClick={onUpload}><Plus /></AiPromptInputToolbarButton>
    <AiPromptInputToolbarButton tooltip="深度思考" active={deep} onClick={() => setDeep(!deep)}><Lightbulb /></AiPromptInputToolbarButton>
    <AiPromptInputSubmit className="ml-auto" />
  </AiPromptInputToolbar>
</AiPromptInput>
<AiPromptInputHelperText>AI may make mistakes. Please verify important information.</AiPromptInputHelperText>
```

- **单行收起(DEC-104)**:`collapsible` 是**形态开关,不是第二个组件**——收起态与展开态共用同一棵 DOM,children 照常写(Textarea + Toolbar + Submit),占位文案只写一份(就是 `AiPromptInputTextarea` 的 `placeholder`)。收起态下 Toolbar 走 `display:contents` 摊成一行,输入区插在按钮与发送钮之间;业务塞进 Toolbar 的自定义子节点会与功能按钮同组排在左侧。形变走 FLIP(180ms),`prefers-reduced-motion: reduce` 下直接到终态。两条约束:①`AiPromptInputAttachments` 在收起态隐藏,有附件的场景请传 `expanded` 保持展开;②收起态行高由发送钮(28px)+ 12px 内边距定为 52px,往 Toolbar 里放更高的自定义控件会撑破胶囊。

```tsx
// 对话详情页的追问入口
<AiPromptInput
  collapsible
  value={value}
  onValueChange={setValue}
  onSubmit={send}
>
  <AiPromptInputTextarea placeholder="进一步询问..." />
  <AiPromptInputToolbar>
    <AiPromptInputToolbarButton tooltip="上传附件">
      <Plus />
    </AiPromptInputToolbarButton>
    <AiPromptInputToolbarButton tooltip="偏好设置">
      <Settings2 />
    </AiPromptInputToolbarButton>
    <AiPromptInputSubmit className="ml-auto" />
  </AiPromptInputToolbar>
</AiPromptInput>
```

- **pill 三形态(DEC-040)**:可序列化字段 `variant`(`slot` / `entity` / `attachment`,缺省 `entity`)+ `status`(`placeholder` / `filled`,缺省按是否有非空 `value` 推导)。库内置默认皮——`slot`+`placeholder` 使用极浅 Brand 背景与 Brand 文字的 badge(label 可保留 `[]` 供序列化与纯文本降级,默认渲染隐藏括号)、`entity` 浅蓝标签、`attachment` 组合 `AiAttachmentChip` 卡片背景 chip + `shadow-sm`。点空槽补全、点已填改绑归业务:`onPillClick` → 开菜单 → `updatePill({ label, value, variant:"entity", status:"filled" })`。选 `/` 指令应 `reset` **带空槽的模板**,不要只插一条 `/标题` pill。
- **约束**:**runtime 无关(DEC-035)**——`status` 由业务传入,组件不订阅生成状态,宽度自适应父容器(设计稿 `min(90vw, 640px)` 由业务页面布局);输入区为**行内 pill 可编辑区**(原生 `contentEditable`,DEC-038 已并入,替换原纯 textarea),内容以 **segments 数据模型**(text/pill)表达,DOM 仅为渲染结果;**无受控 `segments` prop**——初始经 `defaultSegments`,后续增删改 pill 走 `ref` 命令式句柄;Root `value`(`string`)是 segments 的**纯文本镜像**(pill 只贡献其 `label`,不含 `value` 业务载荷),外部 `setValue` 变化会经桥接整棵重建为纯文本(会清空已有 pill,业务改 pill 请用 handle 而非 `setValue`);pill 的 **`value` 与 `label` 分离**(`value` 为业务载荷,全链路保真:DOM 读回 / undo / 拖拽 / 复制粘贴 id 重发但 value/variant/status 保留 / `updatePill`);**触发检测(`/`、`@`)与点击浮层归业务**(组件只抛 `onPillClick` + host anchor,不内置菜单/浮层);附件卡片本体归 B2 `ai-attachment`(`AiPromptInputAttachments` 仅为 chips 布局壳;行内 attachment pill 复用同 item 的 Chip);快捷指令菜单归 B3;功能区按钮全部是业务插槽,组件不内置上传/@引用等具体行为;**字数上限业务自管**(组件不设 `maxLength`,计数经 HelperText 呈现);Enter 发送 / Shift+Enter 换行(`<br>` ↔ `"\n"`)/ **IME 组合中 Enter 不发送**(`isComposing` 保护);相邻 pill 的 Backspace/Delete 整体删除且进原生 undo 栈;running 态视觉按草图实现,设计师后续微调。业务 recipe 两则:

```tsx
// recipe 1:技能卡联动占位符——placeholder 是受控 prop,hover 技能卡时业务改 prop 即时切换;
// 组件不内置过渡动画;技能卡本体不进 Registry。
const [placeholder, setPlaceholder] = React.useState(defaultHint)
<AiPromptInput>…<AiPromptInputTextarea placeholder={placeholder} />…</AiPromptInput>
<SkillCard onMouseEnter={() => setPlaceholder(skill.hint)} onMouseLeave={() => setPlaceholder(defaultHint)} />

// recipe 2:assistant-ui 场景下替换 ComposerPrimitive——胶水映射留业务仓
function Composer() {
  const composerRuntime = useComposerRuntime()
  const [value, setValue] = React.useState("")
  const isRunning = useThreadRuntime().getState().isRunning
  return (
    <AiPromptInput
      value={value}
      onValueChange={setValue}
      status={isRunning ? "running" : "idle"}
      onSubmit={(v) => {
        composerRuntime.setText(v)
        composerRuntime.send()
        setValue("")
      }}
      onStop={() => composerRuntime.cancel()}
    >
      …
    </AiPromptInput>
  )
}
```

- **undo/redo(DEC-044)**:自研 segments 快照历史栈,接管 `Cmd/Ctrl+Z`(撤销)、`Cmd+Shift+Z` / `Ctrl+Y`(重做);打字(词级合并)、相邻 pill 删除、`insertPill`/`removePill`/`updatePill`、拖拽、剪贴板 cut/paste、命令式 `reset()`(含 `/`、`@` 选中后剥触发词+插模板/ pill)全部统一可撤销;唯一清空历史的是外部 `setValue`(新文档,如提交后 `setValue("")`)。撤销/重做光标为 best-effort 还原;IME 组合期间不接管键盘。
- **已知限制**:①`reset` 的 `preserve-best-effort` 光标还原为字符偏移近似(`reset` 本身可撤销、各命令式操作不重建整棵而各自记一步;外部 `setValue` 才清空历史);②外部 `setValue` 只能承载纯文本,想保留/改写 pill 必须走 handle,不要用 `setValue` 回写含 pill 的内容;③无受控 `segments` prop(内容归 DOM,经 `getSegments()` 读回快照);④pill 视觉为 `contentEditable=false` 宿主 span + `createPortal` 渲染按钮,业务勿在 host 内塞可编辑内容;⑤IME/输入法行为依赖浏览器原生,须手测(见「中文输入保护」story);⑥pill 行内对齐靠「盒高 24px 恒等于编辑器 `leading-6` + 宿主 `align-top`」保证(DEC-066),自定义皮(`renderPill`)必须维持 24px 高;`attachment` 形态因 chip 内为 `text-xs`(12px)居中,与 14px 正文基线有约 1px 固有差,属预期。

  **完整交互见 Storybook `CloudAI UI/Agent Chat/AiPromptInput`**(含行内 pill 混排 / value≠label / 拖拽重排 / 多行 / 外部改写等场景;IME 行为需手测)。
