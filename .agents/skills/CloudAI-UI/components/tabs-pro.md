# TabsPro

- **何时用**:需要 Tabs 内容懒加载,且切换后再切回仍保留内部状态时。它基于 Radix Tabs,默认只在 tab 首次激活后挂载内容,之后用 `data-[state=inactive]:hidden` 保持状态。
- **安装**:`npx shadcn@3 add @cloudai/tabs-pro`。
- **导入**:`import { TabsPro, TabsProList, TabsProTrigger, TabsProContent } from '@/components/ui/tabs-pro'`。
- **依赖**:`@radix-ui/react-tabs`。
- **关键 props**:
  | prop                     | 类型                      | 说明                                                            |
  | ------------------------ | ------------------------- | --------------------------------------------------------------- |
  | `value` / `defaultValue` | `string`                  | 当前 tab,支持受控 / 非受控                                      |
  | `onValueChange`          | `(value: string) => void` | tab 切换回调                                                    |
  | `preserveMount`          | `boolean`                 | `TabsProContent` 专属,默认 `true`;为 `false` 时按普通 Tabs 行为 |
  | `forceMount`             | `boolean`                 | 透传 Radix Content,强制挂载                                     |
- **最小示例**:

```tsx
<TabsPro defaultValue="overview">
  <TabsProList>
    <TabsProTrigger value="overview">概览</TabsProTrigger>
    <TabsProTrigger value="logs">日志</TabsProTrigger>
  </TabsProList>
  <TabsProContent value="overview">概览内容</TabsProContent>
  <TabsProContent value="logs">日志内容</TabsProContent>
</TabsPro>
```

- **约束**:`TabsProContent` 必须放在 `TabsPro` 内;需要切换即卸载内容时,显式传 `preserveMount={false}`。
