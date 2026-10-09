# AiPlanCard

- **何时用**:AI Chat 信息流中展示 Agent 生成的**任务执行计划**——可折叠步骤列表(Radix Accordion multiple) + `generating`(骨架)/`pending`(待确认)/`confirmed`(弱化)三态 + 底部确认条。复合组件族:`AiPlanCard` / `AiPlanCardHeader` / `AiPlanCardContent` / `AiPlanCardStep` / `AiPlanCardSkeleton` / `AiPlanCardConfirmBar`。
- **安装**:`npx shadcn@3 add @cloudai/ai-plan-card`。
- **导入**:`import { AiPlanCard, AiPlanCardHeader, AiPlanCardContent, AiPlanCardStep, AiPlanCardSkeleton, AiPlanCardConfirmBar } from '@/components/ui/ai-plan-card'`。
- **依赖**:`@radix-ui/react-accordion`;registry 依赖官方 `button` 与 `@cloudai/simple-tooltip`。
- **关键 props**:
  | prop                                                                            | 类型                                                 | 说明                                                                                                                                                              |
  | ------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `status`                                                                        | `'generating' \| 'pending' \| 'confirmed'`           | Root 卡片状态,默认 `pending`;`confirmed` 打 `data-status` 整体弱化                                                                                                |
  | `expandedSteps` / `defaultExpandedSteps` / `onExpandedStepsChange`              | `string[]`                                           | Root 展开步骤集合,受控/非受控均可                                                                                                                                 |
  | `collapsible` / `collapsed` / `defaultCollapsed` / `onCollapsedChange`          | Root                                                 | 整卡收成一条 header 灰条,默认关闭;打开后 Header 右侧出折叠 chevron。收起走 grid-rows 过渡且 **DOM 常驻**(步骤计数不归零),内容层自动加 `aria-hidden` + `inert`     |
  | `icon` / `title` / `duration` / `extra` / `showExpandAll`                       | Header                                               | `duration` 只展示不计时;`extra` 为右侧业务插槽(版本下拉等);内置「展开/收起全部」按钮默认显示                                                                      |
  | `badge`                                                                         | Header,`ReactNode`                                   | 标题右侧状态插槽(如「已更新」徽标),排在 title 与 duration 之间。**徽标本体不内置**(仓库无 shadcn `badge`,`status-badge` 是六状态语义组件),业务自己贴,配方见 story |
  | `stepsLabel`                                                                    | Header,`ReactNode \| ((count: number) => ReactNode)` | 步骤计数。**省略时只在 `collapsible` 下**自动渲染 `${count} steps`,count 取自已挂载的 `AiPlanCardStep`;传函数可换措辞而不必重新数;传 `null` 隐藏                  |
  | `collapseAriaLabel`                                                             | Header,`string`                                      | 整卡折叠钮的 aria-label,默认英文 `Toggle plan details`(DEC-021)                                                                                                   |
  | `value` / `icon` / `title` / `description`                                      | Step                                                 | `value` 必填(展开集合的 key);children = 展开详情区(业务自渲染 markdown 等)                                                                                        |
  | `rows`                                                                          | Skeleton                                             | 骨架行数,默认 3;generating 时由业务追加在已出步骤之后                                                                                                             |
  | `confirmed` / `defaultConfirmed` / `onConfirmedChange`                          | ConfirmBar                                           | 确认态,受控/非受控均可                                                                                                                                            |
  | `message` / `confirmedMessage` / `modifyText` / `confirmText` / `confirmedText` | ConfirmBar                                           | 文案,默认英文(DEC-021),业务传中文覆盖                                                                                                                             |
  | `onModify` / `onConfirm`                                                        | ConfirmBar                                           | 修改(业务引用整段计划到输入框)/确认回调                                                                                                                           |
  | `autoHideDelay` / `onAutoHide`                                                  | ConfirmBar                                           | 确认后自动淡出延时(默认 2000ms,`null` 禁用)与动画结束回调                                                                                                         |
- **最小示例**:

```tsx
<AiPlanCard status="pending">
  <AiPlanCardHeader title="执行计划" duration="4.5s" />
  <AiPlanCardContent>
    <AiPlanCardStep value="trend" title="整体销售趋势分析" description="分析历史销售量与销售额的整体趋势">
      {/* 展开详情(业务渲染 markdown) */}
    </AiPlanCardStep>
  </AiPlanCardContent>
</AiPlanCard>
<AiPlanCardConfirmBar message="计划完成,需确认是否执行" modifyText="修改" confirmText="确认" onConfirm={run} />
```

- **约束**:**runtime 无关(DEC-035)**——不依赖 `@assistant-ui/react` / `ai` / `@ai-sdk/react`,数据 props 进、事件回调出,无固定宽高/内置滚动,可放进任意 thread 容器(如 assistant-ui `ThreadPrimitive.Viewport`);runtime 胶水留业务仓,recipe 示例——assistant-ui message part → props 映射:

```tsx
// 业务仓胶水(recipe):把 tool part 的 plan 结果映射为 AiPlanCard props
function PlanPart({ part }: { part: ToolCallMessagePart }) {
  const plan = part.result; // { status, durationText, steps: [{ id, title, description }] }
  return (
    <AiPlanCard status={plan.status}>
      <AiPlanCardHeader title="执行计划" duration={plan.durationText} />
      <AiPlanCardContent>
        {plan.steps.map((step) => (
          <AiPlanCardStep
            key={step.id}
            value={step.id}
            title={step.title}
            description={step.description}
          />
        ))}
        {plan.status === 'generating' && <AiPlanCardSkeleton rows={2} />}
      </AiPlanCardContent>
    </AiPlanCard>
  );
}
```

版本切换下拉不内置(版本列表/回退是业务数据),经 Header `extra` 插槽自带;计时值由业务算好传入。

- **整卡收起 + 状态徽标**(DEC-083):

```tsx
<AiPlanCard collapsible defaultCollapsed={false}>
  <AiPlanCardHeader
    title="执行计划"
    badge={
      <span className="bg-brand-1 text-brand-7 inline-flex items-center rounded-full px-2 py-0.5 text-xs leading-4">
        已更新
      </span>
    }
    stepsLabel={(count) => `${count} 个步骤`}
    showExpandAll={false}
    collapseAriaLabel="收起 / 展开执行计划"
  />
  <AiPlanCardContent>{/* steps */}</AiPlanCardContent>
</AiPlanCard>
```

**完整交互见 Storybook `CloudAI UI/Agent Chat/AiPlanCard`**。
