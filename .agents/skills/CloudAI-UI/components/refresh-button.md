# RefreshButton

- **何时用**:列表、卡片区域需要统一的刷新按钮时。`loading` 时图标旋转且按钮禁用。
- **安装**:`npx shadcn@3 add @cloudai/refresh-button`。
- **导入**:`import { RefreshButton } from '@/components/ui/refresh-button'`。
- **依赖**:`lucide-react`。
- **关键 props**:
  | prop         | 类型           | 说明                                           |
  | ------------ | -------------- | ---------------------------------------------- |
  | `loading`    | `boolean`      | 加载态,默认 `false`;为 `true` 时禁用并旋转图标 |
  | `aria-label` | `string`       | 无障碍标签,默认 `"刷新"`                       |
  | 其余         | `button` props | 透传,如 `onClick`、`disabled`                  |
- **最小示例**:

```tsx
<RefreshButton loading={isRefreshing} onClick={handleRefresh} />
```

- **约束**:默认 40×40 方形按钮;需要自定义图标时传 `children` 覆盖默认 `RefreshCw`。
