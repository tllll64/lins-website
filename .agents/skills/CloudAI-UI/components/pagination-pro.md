# PaginationPro

- **何时用**:列表/表格右下角分页，支持 mini（仅箭头）、normal（默认）、full（总数+跳转）三档。数据量 > 40 行时推荐 full 档。
- **安装**:`npx shadcn@3 add @cloudai/pagination-pro`（会自动带上 shadcn `button`、`select`、`input`）。
- **导入**:`import { PaginationPro } from '@/components/ui/pagination-pro'`。
- **依赖**:官方 shadcn `button`、`select`、`input`；`lucide-react`、`@radix-ui/react-use-controllable-state`。
- **关键 props**:
  | prop                           | 类型                           | 说明                            |
  | ------------------------------ | ------------------------------ | ------------------------------- |
  | `variant`                      | `'mini' \| 'normal' \| 'full'` | 形态档位，默认 `normal`         |
  | `total`                        | `number`                       | **必填**，数据总条数            |
  | `current` / `defaultCurrent`   | `number`                       | 当前页（1-based），受控/非受控  |
  | `pageSize` / `defaultPageSize` | `number`                       | 每页条数，默认 20               |
  | `onChange`                     | `(page, pageSize) => void`     | 页码或每页条数变化回调          |
  | `onPageSizeChange`             | `(pageSize) => void`           | 仅每页条数变化回调              |
  | `pageSizeOptions`              | `number[]`                     | 下拉选项，默认 `[10,20,50,100]` |
  | `siblingCount`                 | `number`                       | 当前页两侧页码数，默认 1        |
- **最小示例**:

```tsx
<PaginationPro
  variant="normal"
  total={198}
  defaultCurrent={1}
  defaultPageSize={20}
  onChange={(p, s) => fetchData(p, s)}
/>
```

- **约束**:命名 `-pro` 避免覆盖官方 shadcn `pagination`；切换 pageSize 自动回第 1 页；样式仅 DESIGN token。**完整三档形态与交互见 Storybook `CloudAI UI/Console/PaginationPro`**。
