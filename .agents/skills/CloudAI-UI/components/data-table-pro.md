# DataTablePro

- **何时用**:常见数据列表页（搜索/筛选/刷新/列设置/分页/多选/视图切换）的**默认入口**。它是现有组件的薄编排；需改变组合结构时改用 `DataTable` + `useDataTable`，只需操作表格实例时通过 `tableRef` / `onTableReady` 获取 TanStack 实例（DEC-023）。
- **安装**:`npx shadcn@3 add @cloudai/data-table-pro`（自动带上 `@cloudai/data-table`、`@cloudai/pagination-pro`、`@cloudai/view-switch`、`@cloudai/refresh-button` 等；`@tanstack/react-table` 锁 `^8.21.3`，**不要**升 v9）。
- **导入**:`import { DataTablePro } from '@/components/ui/data-table-pro'`。
- **关键 props**:
  | prop                           | 类型                              | 说明                                                                                                     |
  | ------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------- |
  | `columns` / `data`             | `ColumnDef[]` / `T[]`             | **必填**，列定义与当前页数据                                                                             |
  | `search` / `filter`            | `ReactNode`                       | 工具区左侧插槽（搜索、FilterGroupV2 等由业务传入）；窄屏筛选整行落下、宽屏与搜索同行（DEC-047）          |
  | `onRefresh`                    | `() => void`                      | 传则渲染 `RefreshButton`                                                                                 |
  | `pagination`                   | `PaginationProProps \| false`     | 右下分页；不传则不渲染；传 `false` 显式关闭                                                              |
  | `loading`                      | `boolean`                         | 数据加载蒙层 + 旋转 loading 图标；**刷新时保留旧 `data` 勿清空**，避免高度突变                           |
  | `batchActions`                 | `ReactNode`                       | 多选浮层内批量操作按钮区                                                                                 |
  | `showViewSwitch` / `cardView`  | `boolean` / `(item) => ReactNode` | 列表/卡片切换                                                                                            |
  | `cardGrid`                     | `(cards) => ReactNode`            | 卡片网格容器。资源卡传入 `ResourceCardGrid`，不要每张卡外套一层；不传则内置 `1 / md:2 / lg:3`（DEC-106） |
  | `tableRef` / `onTableReady`    | `Ref<Table>` / `(table) => void`  | **逃生舱**，拿 TanStack 实例做列/选择/排序定制                                                           |
  | `sorting` / `rowSelection` / … | 受控 TanStack state               | 透传 `useDataTable`                                                                                      |
  | `manualSorting`                | `boolean`                         | 服务端排序，透传 `useDataTable`；不对当前页再做客户端排序                                                |
- **最小示例**:

```tsx
const columns = buildColumns({ withSelection: true })
<DataTablePro
  columns={columns}
  data={pageData}
  getRowId={(row) => row.id}
  search={<Input placeholder="Search" className="h-9 w-64" />}
  onRefresh={refetch}
  pagination={{ variant: 'normal', total, current: page, onChange: setPage }}
  batchActions={<Button size="sm">Batch delete</Button>}
/>
```

- **约束**:纯编排、非黑盒——源码可复制 fork；`filter` 插槽不硬依赖 `FilterGroupV2`；工具区窄屏分层见 DEC-047（勿再把 search/filter/图标塞进不可换行的单行 flex）；默认文案英文/空 placeholder（DEC-021）；服务端分页 + 跨页多选用 `useTableRowCacheData(table, rowSelection)`（DEC-022）。根布局默认**内容流式**（表格高度随行数、分页紧贴表格、页面底部允许留白），列表页就用这个默认：**不要为了把分页钉在底部去写 `h-full` 或在 `scrollContainerClassName` 上写死 `max-h-[560px]`**（DEC-031 / DEC-105）。`scrollContainerClassName` 留给弹窗小表设观感高度上限。**完整交互见 Storybook `CloudAI UI/Console/DataTablePro`**。
