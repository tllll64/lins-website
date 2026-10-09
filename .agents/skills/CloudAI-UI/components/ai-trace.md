# AiTrace

- **何时用 *:AI Chat **消息流**中展示 Agent 的深度思考过程与工具/API 调用轨迹(扁平行内折叠,无卡片壳)。复合组件族:`AiThinking` / `AiToolCall` / `AiToolCallName` / `AiToolCallParams` / `AiToolCallOutput`;可选 `getAiToolCallIcon(kind)`;另导出共用面板 `AiTraceContent`,以及两种展开预设的纯展示件 `AiToolCallPanel` / `AiToolCallList` / `AiToolCallListItem` / `AiToolCallKeywords` / `AiToolCallKeyword`。
- **选型**:链内层级用 `AiChainReasoningCard` / `AiChainTaskBar`;消息流轻量行用本组件——**共存、不替代**(DEC-045)。
- **安装**:`npx shadcn@3 add @cloudai/ai-trace`(目录 item,装入 `components/ui/ai-trace/`)。
- **导入**:`import { AiThinking, AiToolCall, AiToolCallName, AiToolCallParams, AiToolCallOutput, getAiToolCallIcon } from '@/components/ui/ai-trace'`。
- **依赖**:`lucide-react`、`@radix-ui/react-use-controllable-state`;registry 依赖 `@cloudai/icons`(点阵加载动画)。
- **关键 props**:
  | prop                                                                      | 类型                                         | 说明                                                                                                                                                                                                                                     |
  | ------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `status`                                                                  | Thinking,`'running' \| 'success'`            | 默认 `running`;running = 标题扫光 + 左侧点阵加载动画,success = 置灰 + 静态点阵                                                                                                                                                           |
  | `title` / `duration` / `icon`                                             | Thinking,`ReactNode`                         | 无默认文案;`duration` 业务算好传入;`icon` 左侧图标,默认 running 态点阵动画 / success 态静态点阵,展开的完成态由 chevron 顶替、其余状态 hover 切 chevron                                                                                   |
  | `expanded` / `defaultExpanded` / `onExpandedChange` / `collapseOnSuccess` | Thinking                                     | 非受控默认展开;`collapseOnSuccess` 默认 `true`(仅 status **转变为** success 时自动折叠,挂载即 success 需 `defaultExpanded={false}`)                                                                                                      |
  | `toggleAriaLabel`                                                         | Thinking / ToolCall,`string`                 | header 折叠按钮无障碍标签;默认 `"Toggle thinking"` / `"Toggle tool call details"`                                                                                                                                                        |
  | `status`                                                                  | ToolCall,`'running' \| 'success' \| 'error'` | 默认 `running`;running = brand icon 与标题一起被高光扫过,error 时 icon/标题/detail 走 `warning-high-foreground`(设计稿 `semantic/warning-high-*`,不是 `destructive`)                                                                     |
  | `icon` / `title` / `detail`                                               | ToolCall,`ReactNode`                         | detail 为右侧弱化方法名/关键词;`icon` 可用 `getAiToolCallIcon('search'\|'list'\|'view'\|'execute')`                                                                                                                                      |
  | `expanded` / `defaultExpanded` / `onExpandedChange`                       | ToolCall                                     | 非受控默认**收起**(进行中亦然);children = Name/Params/Output                                                                                                                                                                             |
  | `surface`                                                                 | ToolCall,`'plain' \| 'card'`                 | 默认 `plain`(扁平行,DEC-045);`card` 为灰底描边卡片壳(hover 变色、失败态红底描边)。**展开区贴满卡片左右下三边,内容要用 `AiToolCallPanel` 包成白卡**(同 `AiPlanCard` 的灰壳 + 白内容卡);裸 `Params` 会挂在卡片边沿上,那是 `plain` 档的用法 |
  | `contentMaxHeight`                                                        | ToolCall,`number \| 'none'`                  | 展开区最大高度。`plain` 默认 200(滚动 + 底遮罩),`card` 默认 `'none'`——限高交给 `AiToolCallPanel` 在白卡内部做,外层再钳一次会在白卡底部压出错位遮罩                                                                                       |
  | `maxHeight`                                                               | Panel,`number \| 'none'`                     | 默认 200(与普通 toolcall 一致);超出后按滚动位置出上下遮罩。传 `'none'` 不限高                                                                                                                                                            |
  | `index`                                                                   | ListItem,`number \| null`                    | 序号。省略时由 `AiToolCallList` 按 children 位置自动灌;传 `null` 不出序号徽标                                                                                                                                                            |
  | `label`                                                                   | Keywords,`ReactNode`                         | 关键词行前缀(如「关键词:」),默认无(DEC-021)                                                                                                                                                                                              |
- **最小示例**:

```tsx
<AiThinking status="running" title="Thinking" duration="2.5s">
  用户想要诊断实例 CPU 使用率问题……
</AiThinking>

<AiToolCall
  status="running"
  icon={getAiToolCallIcon("execute")}
  title="正在执行 DAS API"
  detail="getPerformanceDiagnoseForOneShot"
>
  <AiToolCallName>getPerformanceDiagnoseForOneShot</AiToolCallName>
  <AiToolCallParams>{`{ "instance_id": "rm-…" }`}</AiToolCallParams>
</AiToolCall>
```

- **约束**:**runtime 无关(DEC-035)**——不计时、不订阅;正文/参数/输出均为 `ReactNode`(不内置 JSON 序列化与「参数:」文案,DEC-021);内容区 max-height 200px + 内部滚动 + 底遮罩为设计规格例外;Shiny Text 为 `animate-pulse` 降级,完整动效待主题插件。recipe:

```tsx
function ReasoningPart({
  text,
  done,
  duration,
}: {
  text: string;
  done: boolean;
  duration: string;
}) {
  return (
    <AiThinking
      status={done ? 'success' : 'running'}
      title="Thinking"
      duration={duration}
      defaultExpanded={!done}
    >
      {text}
    </AiThinking>
  );
}

function ToolPart({
  part,
}: {
  part: {
    status: 'running' | 'success' | 'error';
    toolName: string;
    args: unknown;
    title: string;
  };
}) {
  return (
    <AiToolCall
      status={part.status}
      icon={getAiToolCallIcon('execute')}
      title={part.title}
      detail={part.toolName}
    >
      <AiToolCallName>{part.toolName}</AiToolCallName>
      <AiToolCallParams>{JSON.stringify(part.args, null, 2)}</AiToolCallParams>
    </AiToolCall>
  );
}
```

- **两种特殊展开形态**(DEC-084):下拉里**不出 tool name 与传参**,只出内容面板。链接元素与 Markdown 正文一律由业务传——组件不产出 `<a>`、不收 `href`,也不内置 markdown 渲染器(同 DEC-070 的 code-block 不内置高亮器)。

```tsx
// 形态一:文档有序列表(序号自动灌;白卡默认 max-height 200)
<AiToolCall surface="card" status="success" defaultExpanded
  icon={getAiToolCallIcon("search")} title="搜索到 10 篇阿里云文档" detail="MySQL慢日志分析和优化">
  <AiToolCallPanel>
    <AiToolCallList>
      {docs.map((doc) => (
        <AiToolCallListItem key={doc.id}>
          <a href={doc.url} target="_blank" rel="noreferrer">{doc.title}</a>
        </AiToolCallListItem>
      ))}
    </AiToolCallList>
  </AiToolCallPanel>
</AiToolCall>

// 形态二:关键词 + Markdown 正文(白卡默认 max-height 200,超出出上下遮罩)
<AiToolCall surface="card" status="success" defaultExpanded
  icon={getAiToolCallIcon("search")} title="搜索到 10 个 DAS 运维技能" detail="SQL,分析,优化">
  <AiToolCallPanel>
    <AiToolCallKeywords label="关键词:">
      {keywords.map((k) => <AiToolCallKeyword key={k}>{k}</AiToolCallKeyword>)}
    </AiToolCallKeywords>
    <YourMarkdown source={result.markdown} />
  </AiToolCallPanel>
</AiToolCall>
```

**完整交互见 Storybook `CloudAI UI/Agent Chat/AiThinking 深度思考` / `CloudAI UI/Agent Chat/AiToolCall 工具调用` / `CloudAI UI/Agent Chat/AiTrace 组合`**。
