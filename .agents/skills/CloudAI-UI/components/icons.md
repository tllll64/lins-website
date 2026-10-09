# Icons

自研图标群(DEC-049,对标 `@ant-design/icons`):**一次安装拿全部**,目录内按上色规则分两组——根目录功能图标(`currentColor`)、`file-type/` 多色文件图标(保留 hex 品牌资产)。与 lucide **分工**:lucide 管通用单色**静态**功能 icon(箭头/关闭/加载等,业务直接用);本包管 lucide 缺失/需动效/自定义几何的功能 icon + 多色文件类型资产。`AiAttachment` 等组件仍只收 `icon` 槽,不内置这些资产——业务安装后传入。

- **安装**:`npx shadcn@3 add @cloudai/icons`。
- **导入**:`import { DotMatrixSpinner, FileTypePdf } from '@/components/ui/icons'`。
- **依赖**:无(仅 `react`)。
- **功能图标**(根目录,`currentColor` + `text-*` 上色):
  | 导出               | 说明                                                                                               |
  | ------------------ | -------------------------------------------------------------------------------------------------- |
  | `DotMatrixSpinner` | 3×3 点阵加载动画;`currentColor` 上色;reduced-motion 下退化为静态。`AiThinking` running 态默认 icon |
- **文件类型图标**(`file-type/` 子组,多色品牌资产,保留 hex——DEC-043 例外):
  | 导出                  | 含义     |
  | --------------------- | -------- |
  | `FileTypePdf`         | PDF      |
  | `FileTypeCode`        | 代码     |
  | `FileTypeHtml`        | HTML     |
  | `FileTypeMarkdown`    | Markdown |
  | `FileTypeSpreadsheet` | 电子表格 |
  | `FileTypeDatabase`    | 数据库   |
  | `FileTypeFolder`      | 文件夹   |
  | `FileTypeImage`       | 图像     |
  | `FileTypeVideo`       | 视频     |
  | `FileTypeArchive`     | 压缩包   |
  | `FileTypeDashboard`   | 动态看板 |
  | `FileTypeUnknown`     | 未知文件 |
- **最小示例**:

```tsx
import { DotMatrixSpinner, FileTypePdf, FileTypeSpreadsheet } from '@/components/ui/icons'
import { SvgIcon } from '@/components/ui/svg-icon'

<DotMatrixSpinner className="text-brand-foreground size-4" />
<AiAttachmentCard icon={<FileTypePdf />} title="方案.pdf" meta="pdf · 820 KB" />
<SvgIcon icon={FileTypeSpreadsheet} size={16} />
```

- **约束**:引擎类型图标走独立 item `@cloudai/engine-icon`（DEC-072），不要并进本包。根目录功能 icon 才吃 `text-*`；`file-type/` 保留设计稿色。
