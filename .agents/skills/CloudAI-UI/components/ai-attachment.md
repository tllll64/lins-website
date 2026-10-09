# AiAttachment

- **何时用**:对话流程中展示用户上传/引用的文件、图片等附件(输入侧 B2,DEC-037)——常置于 `AiPromptInput` 的 `AiPromptInputAttachments` 插槽行,也可独立使用(如消息气泡内回显附件)。**纯展示组件族**,四件各自独立:`AiAttachmentCard`(icon 块 + 标题 + meta 行)/ `AiAttachmentChip`(紧凑 pill,遮罩式删除不改宽度)/ `AiAttachmentImage`(方形略缩图)/ `AiAttachmentPreview`(hover 预览浮层壳)。
- **安装**:`npx shadcn@3 add @cloudai/ai-attachment`(会自动带上官方 shadcn `hover-card`)。
- **导入**:`import { AiAttachmentCard, AiAttachmentChip, AiAttachmentImage, AiAttachmentPreview } from '@/components/ui/ai-attachment'`。
- **依赖**:`lucide-react`;registry 依赖官方 shadcn `hover-card`。
- **关键 props**:
  | prop                                                            | 类型                                       | 说明                                                                                                                                                                                                        |
  | --------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `icon`                                                          | Card/Chip,`ReactNode`                      | 文件类型图标——**组件不内置**;推荐安装 `@cloudai/icons` 后传入 `FileType*`(DEC-043/049),缺省灰色 lucide `File` 兜底                                                                                          |
  | `title` / `meta`                                                | Card/Chip,`ReactNode`                      | 标题超长 truncate;`meta`(如 `"excel · 1.21 MB"`)由业务**拼好传入**,组件不做字节格式化(DEC-021)                                                                                                              |
  | `status`                                                        | 三形态,`'ready' \| 'uploading' \| 'error'` | 默认 `ready`;`uploading` = icon 位 Loader2 旋转(Image 为图上遮罩);Card 的 `error` = destructive 描边与错误说明,标题保持正常文字色;Chip 的 `error` 标题使用 destructive。经 `data-status` 暴露供业务覆盖样式 |
  | `unsupported`                                                   | Card/Chip,`boolean`                        | 未知/不支持类型仅将 icon 置灰,标题与说明保持正常层级;业务传入的 `icon`(如 `FileTypeUnknown`)保留不替换,仅未传 `icon` 时才灰色 File 兜底,`data-unsupported` 暴露                                             |
  | `onRemove`                                                      | 三形态,`() => void`                        | 提供时 hover 显示删除钮并触发(Card/Image 右上角浮钮、Chip 右端遮罩式**不改变宽度**);已 `stopPropagation`,不与卡片本体点击冲突;不提供则无删除钮                                                              |
  | `fluid`                                                         | Card,`boolean`                             | 默认 `false`(既有 170×44 紧凑卡,输入区附件);`true` 撑满父容器并放大排版(图标盒 36、标题 14px、hover 变色),用于消息流里的结果文件                                                                            |
  | `actions`                                                       | Card,`ReactNode`                           | 右侧操作插槽。**菜单本体不内置**——业务用自己的 `DropdownMenu` 包组件导出的 `AiAttachmentActionButton`(统一触发器视觉),`dropdown-menu` 不进 registry 依赖                                                    |
  | `actionsVisibility`                                             | Card,`'hover' \| 'always'`                 | 默认 `'hover'`(含 focus-within 与**菜单打开态**);菜单开着时按钮不会消失                                                                                                                                     |
  | `src` / `alt`                                                   | Image,`img` props                          | 略缩图默认 `size-10`,`className` 可覆盖尺寸;其余 img 原生 props 透传                                                                                                                                        |
  | `content` / `contentClassName` / `openDelay` / `side` / `align` | Preview                                    | `content` 为浮层内容(表格预览/大图等,**业务渲染**,含 padding);为空时直接渲染 children 不挂浮层;`openDelay` 默认 300ms                                                                                       |
- **最小示例**:

```tsx
import { FileTypeSpreadsheet } from '@/components/ui/icons';

<AiPromptInputAttachments>
  <AiAttachmentPreview content={<MyTablePreview />}>
    <AiAttachmentCard
      icon={<FileTypeSpreadsheet />}
      title="财年付费客户_脱敏"
      meta="excel · 1.21 MB"
      onRemove={() => remove(id)}
    />
  </AiAttachmentPreview>
  <AiAttachmentImage
    src={thumbUrl}
    alt="产品图"
    onRemove={() => remove(imgId)}
  />
</AiPromptInputAttachments>;
```

- **约束**:**runtime 无关(DEC-035)**——文件选择、上传请求、进度计算全归业务,组件只按 `status` prop 渲染;**无 `attachments={[...]}` 列表配置 API**,列表由业务 map(DEC-036);pill 与指令文本行内混排 + 拖拽属 DEC-038 可编辑区 spike 线,本期 `AiAttachmentChip` 为独立使用的 pill 视觉本体;`uploading` / `error` 视觉为设计缺口先行版(设计稿未画,视觉从简集中一处,设计师补稿后微调);「上传后智能推荐提示词」是业务编排(受控改 `AiPromptInput` placeholder),不进组件。runtime 胶水留业务仓,recipe 示例——assistant-ui attachment adapter 数据 → props 映射:

```tsx
// 业务仓胶水(recipe):把 composer attachment 状态映射为 AiAttachmentCard/Image props
function ComposerAttachments() {
  const attachments = useComposerAttachments(); // [{ id, name, type, sizeText, status, thumbUrl }]
  return (
    <AiPromptInputAttachments>
      {attachments.map((att) =>
        att.thumbUrl ? (
          <AiAttachmentImage
            key={att.id}
            src={att.thumbUrl}
            alt={att.name}
            status={
              att.status === 'uploading'
                ? 'uploading'
                : att.status === 'failed'
                  ? 'error'
                  : 'ready'
            }
            onRemove={() => removeAttachment(att.id)}
          />
        ) : (
          <AiAttachmentCard
            key={att.id}
            icon={fileTypeIcon(att.type)}
            title={att.name}
            meta={
              att.status === 'uploading'
                ? 'Uploading...'
                : `${att.type} · ${att.sizeText}`
            }
            status={
              att.status === 'uploading'
                ? 'uploading'
                : att.status === 'failed'
                  ? 'error'
                  : 'ready'
            }
            unsupported={!isSupported(att.type)}
            onRemove={() => removeAttachment(att.id)}
          />
        ),
      )}
    </AiPromptInputAttachments>
  );
}
```

- **消息流结果文件:流式行 + 下拉操作**(DEC-085)。`actions` 与 `onRemove` **二选一**:结果文件用 `actions`,输入区附件用 `onRemove` 的 ×。

```tsx
import {
  AiAttachmentActionButton,
  AiAttachmentCard,
} from '@/components/ui/ai-attachment';

<AiAttachmentCard
  fluid
  icon={<FileTypeSpreadsheet />}
  title="2024年销售数据分析报告"
  meta="excel · 1.21 MB · 有效期至 2026-09-30"
  actions={
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AiAttachmentActionButton aria-label="更多操作">
          <Ellipsis strokeWidth={1.75} />
        </AiAttachmentActionButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {/* 预览 / 下载 / 重命名 / 删除 */}
      </DropdownMenuContent>
    </DropdownMenu>
  }
/>;
```

**完整交互见 Storybook `CloudAI UI/Agent Chat/AiAttachment`**。
