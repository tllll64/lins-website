# DataTable

- **何时用**:需要排序/行选择/锁列/列宽/列序/列显隐的数据表格，且需**完全掌控排版**时。**实例式用法**：先 `useDataTable` 拿 TanStack `table` 实例，再传给 `DataTable` 壳；整页一把梭优先 `DataTablePro`（DEC-023）。
- **安装**:`npx shadcn@3 add @cloudai/data-table`（会自动带上 shadcn `table`、`checkbox`、`popover`、`button` 及 `@cloudai/simple-tooltip`）。
- **导入**:`import { DataTable, useDataTable, SortableHeader, TextCell, createSelectionColumn } from '@/components/ui/data-table'`。
- **依赖**:`@tanstack/react-table@^8`（**不要**装 v9：v9 根入口不再导出 `useReactTable`，`getCoreRowModel` 挪到 `/legacy` 子路径，本组件源码是 v8 API；registry 已锁 `^8.21.3`，CLI 会按此范围安装）、`@dnd-kit/*`、`lucide-react`；shadcn `table`/`checkbox`/`popover`/`button`；`@cloudai/simple-tooltip`。
- **关键 API**:
  | 名称                                                                   | 说明                                                                                                                                                                           |
  | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | `useDataTable({ data, columns, ... })`                                 | TanStack 薄封装，默认开启排序/选择/列宽/锁列，支持受控 `sorting`/`rowSelection`/…；服务端排序传 `manualSorting: true`（不对当前页再做客户端排序，由业务按 `sorting` 重新请求） |
  | `DataTable({ table, loading? })`                                       | `loading` 时调用 `LoadingOverlay` 覆盖表格区；保留旧数据行                                                                                                                     |
  | `SortableHeader`                                                       | 三态排序表头，用于 `columnDef.header`                                                                                                                                          |
  | `ColumnSettings`                                                       | 齿轮 Popover：列显隐 + dnd 排序                                                                                                                                                |
  | `SelectionBar`                                                         | 多选浮层（放在 `DataTable` children 内）                                                                                                                                       |
  | `createSelectionColumn()`                                              | 行选择列 helper，默认锁左                                                                                                                                                      |
  | `TextCell`/`TagsCell`/`TimeCell`/`StatusCell`/`LinkCell`/`ActionsCell` | colRender 单元格族;`TagsCell`/`ActionsCell` 同 label 可重复,内部用 index 防 key 冲突                                                                                           |
- **最小示例**:

```tsx
const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="名称" />,
    cell: ({ row }) => <TextCell value={row.original.name} />,
  },
];
const table = useDataTable({ data, columns });
return <DataTable table={table} />;
```

- **端到端组合示例**（深度定制，等价于 `DataTablePro` 内部编排）:

```tsx
const table = useDataTable({ data, columns, getRowId, rowSelection, onRowSelectionChange })
<div className="flex flex-col gap-4">
  <div className="flex items-center justify-between gap-3">
    <div className="flex flex-1 items-center gap-2">{search}{filter}</div>
    <div className="flex items-center gap-2">
      <ColumnSettings table={table} />
      <RefreshButton onClick={onRefresh} className="h-8 w-8 shrink-0" />
      <ViewSwitch value={view} onChange={setView} />
    </div>
  </div>
  <DataTable table={table}>
    <SelectionBar table={table}>{batchActions}</SelectionBar>
  </DataTable>
  <div className="flex justify-end">
    <PaginationPro variant="normal" total={total} current={page} onChange={onPageChange} />
  </div>
</div>
```

- **约束**:行为一律 TanStack（DEC-016），禁止自研状态机；`ColumnMeta.title/align/hideable/className` 为跨组件约定；无锁列时表宽铺满容器；有锁列时宽屏富余宽度只分给非锁列、窄屏横向滚动且 sticky 不错位（DEC-031）；锁列边界阴影对齐 ant-d——贴对应边时无阴影、横向滚动离开该边时左/右锁列组的边界列淡入阴影（DEC-033）。常见整页组合直接用 `DataTablePro`；自定义组合时按当前任务读取 `design-system/hierarchy.md` 与 `design-system/layout.md`，不要把页面类型当成固定模板。**完整交互见 Storybook `CloudAI UI/Console/DataTable`**。
