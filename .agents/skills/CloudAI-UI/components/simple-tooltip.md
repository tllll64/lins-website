# SimpleTooltip

- **何时用**:需要给某个元素加 hover 提示时。它是对 shadcn `Tooltip` 的轻封装,省掉 `TooltipProvider` / `TooltipTrigger` / `TooltipContent` 的样板;内部已包 `Provider` 且 `delayDuration={0}`。
- **安装**:`npx shadcn@3 add @cloudai/simple-tooltip`。
- **导入**:`import { SimpleTooltip } from '@/components/ui/simple-tooltip'`(以本仓库 `components.json` 别名为准)。
- **依赖**:官方 shadcn `tooltip`。
- **关键 props**:
  | prop                                    | 类型                                     | 说明                                    |
  | --------------------------------------- | ---------------------------------------- | --------------------------------------- |
  | `title`                                 | `React.ReactNode`                        | **必填**,提示内容                       |
  | `children`                              | `React.ReactNode`                        | 触发元素(作为 `TooltipTrigger asChild`) |
  | `side`                                  | `'top' \| 'right' \| 'bottom' \| 'left'` | 弹出方向                                |
  | `align`                                 | `'start' \| 'center' \| 'end'`           | 对齐                                    |
  | `open` / `defaultOpen` / `onOpenChange` | 受控相关                                 | 需要受控时传                            |
  | `contentClassName`                      | `string`                                 | 透传给 `TooltipContent`                 |
- **最小示例**:

```tsx
<SimpleTooltip title="保存" side="top">
  <Button size="icon">
    <Save className="h-4 w-4" />
  </Button>
</SimpleTooltip>
```

- **约束**:`children` 必须是能接受 ref 的单个元素(走 `asChild`);提示文案放 `title`,不要塞进 `children`。
