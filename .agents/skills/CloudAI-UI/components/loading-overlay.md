# LoadingOverlay

- **何时用**:任意 `relative` 内容区需要加载态时（表格、卡片网格、面板等）。蒙层覆盖旧内容，**勿清空数据**，避免高度突变；`DataTable` / `DataTablePro` 的 `loading` 内部即用此组件。
- **安装**:`npx shadcn@3 add @cloudai/loading-overlay`。
- **导入**:`import { LoadingOverlay } from '@/components/ui/loading-overlay'`。
- **依赖**:`lucide-react`。
- **关键 props**:
  | prop        | 类型     | 说明                            |
  | ----------- | -------- | ------------------------------- |
  | `label`     | `string` | sr-only 文案，默认 `loading...` |
  | `className` | `string` | 蒙层容器 className              |
- **最小示例**:

```tsx
<div className="relative min-h-40 rounded-lg border p-4">
  {/* 旧内容保留 */}
  {loading && <LoadingOverlay />}
</div>
```

- **约束**:父级必须 `relative`（或 `absolute` 定位上下文），且**不要**把蒙层放进 `overflow-auto`/`overflow-scroll` 容器内——`absolute inset-0` 只盖可视区，内容横/纵滚动后会露馅（DEC-032）；`DataTable` / 卡片视图已挂在非滚动祖先上。由业务控制 `{loading && <LoadingOverlay />}`，组件本身不感知 loading 状态。
