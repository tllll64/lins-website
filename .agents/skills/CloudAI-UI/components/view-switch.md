# ViewSwitch

- **何时用**:列表页右上角列表/卡片视图切换。只发 value、不拥有内容区，控制远处表格/卡片区渲染。
- **安装**:`npx shadcn@3 add @cloudai/view-switch`。
- **导入**:`import { ViewSwitch } from '@/components/ui/view-switch'`。
- **依赖**:`lucide-react`、`@radix-ui/react-toggle-group`（Radix 原语，非 tabs-pro）。
- **关键 props**:
  | prop                     | 类型                 | 说明                      |
  | ------------------------ | -------------------- | ------------------------- |
  | `options`                | `ViewSwitchOption[]` | 默认 list/card 两档       |
  | `value` / `defaultValue` | `string`             | 当前视图 key，受控/非受控 |
  | `onChange`               | `(value) => void`    | 视图切换回调              |
  | `disabled`               | `boolean`            | 禁用整组                  |
- **最小示例**:

```tsx
<ViewSwitch value={view} onChange={setView} />
```

- **约束**:基于 Radix ToggleGroup（DEC-019），**不要**用 tabs-pro；恒有一个激活项；激活态 token 对齐 TabsPro 配方（`data-[state=on]`）。
