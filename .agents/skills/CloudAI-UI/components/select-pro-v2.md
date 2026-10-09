# SelectProV2

- **何时用**:需要增强型下拉选择(单选/多选/搜索/异步 dataSource/缓存/清除/tag 多选)时。业务仓旧 `select-pro` **保留本地不动**;新页面装 v2。简单静态单选仍可用 shadcn `Select`。
- **安装**:`npx shadcn@3 add @cloudai/select-pro-v2`(会自动带上 registry 依赖 `@cloudai/command-card` 及 shadcn `button`、`popover`、`command`、`checkbox`、`input-group` 等)。
- **导入**:`import { SelectProV2 } from '@/components/ui/select-pro-v2'`。
- **依赖**:共享底座 [`command-card`](command-card.md)（`@/components/ui/command-card`）；官方 shadcn `button`、`popover`、`command`、`checkbox`、`input-group`。
- **关键 props**(精简;完整交互与 story 见 Storybook **`CloudAI UI/Console/SelectProV2`**):
  | prop                                  | 类型                     | 说明                                         |
  | ------------------------------------- | ------------------------ | -------------------------------------------- |
  | `dataSource`                          | `CommandItem[] \| fn`    | 静态数组或异步函数                           |
  | `value` / `defaultValue` / `onChange` | 受控相关                 | 默认传原始值;`onChange(value, records)` 双参 |
  | `labelInValue`                        | `boolean`                | `true` 时等价旧 select-pro 对象 API          |
  | `selectMode`                          | `'single' \| 'multiple'` | 默认 `single`                                |
  | `isSearch`                            | `boolean`                | 搜索模式                                     |
  | `cacheOptions`                        | `boolean`                | 默认 `true`,popover 重开不重拉               |
  | `ref.refresh()`                       | 命令式                   | 缓存开启时也可强刷                           |
- **最小示例**:

```tsx
<SelectProV2
  dataSource={options}
  defaultValue="id-1"
  onChange={(value, records) => console.log(value, records)}
/>
```

- **约束**:样式仅 DESIGN token;受控用 Radix `useControllableState`;编辑回显且项不在 options 时用 `labelInValue` 或保证 options 含该项。**完整 props 与异步/缓存演示以 Storybook 为准**,避免与本文件双份维护。
