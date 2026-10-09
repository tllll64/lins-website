# AiChain

- **何时用**:AI Chat 信息流中以**链式结构**展示 Agent 任务的执行流程与层级关系——状态节点(icon + 标题 + 可折叠描述/内容)+ 节点间状态渐变连线 + 节点内子任务。复合组件族:`AiChain` / `AiChainNode` / `AiChainTaskBar`(终端条) / `AiChainReasoningCard`(推理单元卡);后两者不依赖 Chain context,**可独立使用**。
- **安装**:`npx shadcn@3 add @cloudai/ai-chain`(目录 item,装入 `components/ui/ai-chain/`)。
- **导入**:`import { AiChain, AiChainNode, AiChainTaskBar, AiChainReasoningCard } from '@/components/ui/ai-chain'`。
- **依赖**:`lucide-react`、`@radix-ui/react-use-controllable-state`;无 shadcn registry 依赖。
- **关键 props**:
  | prop                                                                      | 类型                                                  | 说明                                                                                                                                                                                   |
  | ------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | —                                                                         | Root                                                  | 无专有 props;children = `AiChainNode` 组合(禁止 `nodes={[...]}` 配置数组)                                                                                                              |
  | `value`                                                                   | Node,`string`                                         | 必填,节点唯一标识,**同一条链内必须唯一**(context 注册顺序 = 挂载顺序,连线渐变取前驱状态;重复 value 会导致连线错乱)                                                                     |
  | `status`                                                                  | Node,`'success' \| 'running' \| 'pending' \| 'error'` | 默认 `success`;驱动 icon 状态色、入线渐变、running 闪影(内置 pulse 近似)                                                                                                               |
  | `icon` / `title` / `description`                                          | Node,`ReactNode`                                      | hover 标题行时 icon 位淡入切换为折叠/展开箭头;description 仅展开时显示                                                                                                                 |
  | `expanded` / `defaultExpanded` / `onExpandedChange`                       | Node                                                  | 展开,受控/非受控均可(非受控默认 `true`)                                                                                                                                                |
  | `collapseOnSuccess`                                                       | Node,`boolean`                                        | 默认 `true`;**仅在 status 由非 success「转变为」success 时**自动折叠,且仅非受控生效。挂载即 `success`(如历史回放)不会自动折叠,用 `defaultExpanded={status !== "success"}` 给初始折叠态 |
  | `status` / `icon`                                                         | TaskBar                                               | `'running'(icon 呼吸) \| 'success' \| 'paused'(warning 色) \| 'error'(destructive 色)`,icon 默认 lucide `SquareTerminal`;children = 文案,纯展示无交互                                  |
  | `status` / `icon` / `title` / `summary`                                   | ReasoningCard                                         | `'running'(brand icon + 标题呼吸) \| 'success'(置灰静止)`;`summary` 在 success 且折叠时显示于标题右侧                                                                                  |
  | `expanded` / `defaultExpanded` / `onExpandedChange` / `collapseOnSuccess` | ReasoningCard                                         | 同 Node,但 `collapseOnSuccess` 默认 `false`;children = 推理内容(流式追加,窗口约 104~256px,底部锚定 + 顶部渐隐)                                                                         |
- **最小示例**:

```tsx
<AiChain>
  <AiChainNode
    value="prep"
    status="success"
    icon={<CodeXml />}
    title="数据准备与预处理"
    description="清洗并整合多源电商数据。"
  >
    <AiChainTaskBar status="success">分析数据完成</AiChainTaskBar>
  </AiChainNode>
  <AiChainNode
    value="top"
    status="running"
    icon={<Filter />}
    title="TOP客户筛选与统计"
  >
    <AiChainTaskBar status="running">正在统计收入</AiChainTaskBar>
    <AiChainReasoningCard
      status="running"
      icon={<Table2 />}
      title="正在理解数据"
    >
      {/* 流式推理内容(业务渲染) */}
    </AiChainReasoningCard>
  </AiChainNode>
  <AiChainNode
    value="growth"
    status="pending"
    icon={<Sparkle />}
    title="高增长客户识别"
  />
</AiChain>
```

- **约束**:**runtime 无关(DEC-035)**——数据 props 进、事件回调出,组件不轮询/不订阅,status 流转由业务驱动;无固定宽高/内置滚动(推理卡内容窗口的 min/max 高度是设计稿组件规格,例外);**动态把节点插入链中间会导致注册顺序与视觉顺序不一致**(节点只尾部追加时无此问题);「需明确的问题」黄色确认卡归 `ai-collab-card`(后续),届时放入 Node children 插槽;Shiny Text / 连线闪影当前为内置 `animate-pulse` 近似,完整动效待主题插件层跟进(相关元素保留 `className` 覆盖点,业务无需改 `tailwind.config`)。runtime 胶水留业务仓,recipe 示例——assistant-ui tool part / step 状态 → 节点映射:

```tsx
// 业务仓胶水(recipe):把 message part 的执行链数据映射为 AiChainNode props
function ChainPart({ part }: { part: ToolCallMessagePart }) {
  const chain = part.result; // { steps: [{ id, status, title, description, task?: { status, text } }] }
  return (
    <AiChain>
      {chain.steps.map((step) => (
        // defaultExpanded 显式跟随 status:collapseOnSuccess 仅在 status 由「非 success」
        // 转变为「success」时触发,历史回放里挂载即 success 的节点不会自动折叠,
        // 需靠 defaultExpanded 给出初始折叠态。
        <AiChainNode
          key={step.id}
          value={step.id}
          status={step.status}
          defaultExpanded={step.status !== 'success'}
          title={step.title}
          description={step.description}
        >
          {step.task && (
            <AiChainTaskBar status={step.task.status}>
              {step.task.text}
            </AiChainTaskBar>
          )}
        </AiChainNode>
      ))}
    </AiChain>
  );
}
```

**完整交互见 Storybook `CloudAI UI/Agent Chat/AiChain`**。
