# ProgressPro

- **何时用**:需要进度条,且要根据状态显示不同颜色(成功/警告/危险)时。基于 Radix Progress,原生带无障碍语义。
- **安装**:`npx shadcn@3 add @cloudai/progress-pro`。
- **导入**:`import { ProgressPro } from '@/components/ui/progress-pro'`。
- **依赖**:`@radix-ui/react-progress`、`class-variance-authority`。
- **关键 props**:
  | prop      | 类型                                                   | 说明                  |
  | --------- | ------------------------------------------------------ | --------------------- |
  | `value`   | `number`                                               | 当前进度值            |
  | `max`     | `number`                                               | 最大值,默认 `100`     |
  | `variant` | `'default' \| 'success' \| 'warning' \| 'destructive'` | 状态色,默认 `default` |
  | 其余      | Radix `Progress.Root` props                            | 透传                  |
- **最小示例**:

```tsx
<ProgressPro value={60} variant="success" />
```

- **约束**:与官方 shadcn `progress` 区分(故命名 `-pro`),不要互相覆盖;颜色只走 variant,勿硬编码。
