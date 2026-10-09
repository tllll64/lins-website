# CollapsedInfo

- **何时用**:表格行、卡片标题旁需要点击图标展开键值详情时。基于 shadcn `Popover` 封装。
- **安装**:`npx shadcn@3 add @cloudai/collapsed-info`。
- **导入**:`import { CollapsedInfo } from '@/components/ui/collapsed-info'`。
- **依赖**:官方 shadcn `popover`、`lucide-react`。
- **关键 props**:
  | prop               | 类型                                      | 说明                  |
  | ------------------ | ----------------------------------------- | --------------------- |
  | `title`            | `string`                                  | **必填**,Popover 标题 |
  | `data`             | `{ label: string; content: ReactNode }[]` | **必填**,键值列表     |
  | `className`        | `string`                                  | 触发按钮类名          |
  | `contentClassName` | `string`                                  | PopoverContent 类名   |
- **最小示例**:

```tsx
<CollapsedInfo
  title="实例详情"
  data={[
    { label: '实例 ID', content: 'rm-abc123' },
    { label: '地域', content: 'cn-hangzhou' },
  ]}
/>
```

- **约束**:触发器为图标按钮,`aria-label` 取 `title`;在可点击行内使用时已 `stopPropagation`。
