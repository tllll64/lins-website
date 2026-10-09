# InlineMarkup

- **何时用**:句子中间标出字段名、状态值、实例 ID 这类**技术记号**。成对反引号渲染成等宽码片，其余按字面输出。已有 `@cloudai/inline-markup` 时优先安装，勿手搓 markdown 解析或再写一份码片样式。整条 SQL / 多行代码用 `CodeBlock`。
- **安装**:`npx shadcn@3 add @cloudai/inline-markup`
- **导入**:`import { InlineMarkup, parseInlineMarkup, inlineCodeVariants } from '@/components/ui/inline-markup'`
- **依赖**:`class-variance-authority`
- **导出**:`InlineMarkup` · `parseInlineMarkup` · `inlineCodeVariants`；类型 `InlineMarkupProps` / `InlineMarkupSegment`
- **关键 props**:
  | prop   | 类型     | 说明                                           |
  | ------ | -------- | ---------------------------------------------- |
  | `text` | `string` | 段落文本。`` `x` `` 渲染成码片，其余按字面输出 |
- **最小示例**:

```tsx
<p>
  <InlineMarkup text="已检查实例 `pc-2ze916p38915ik7q6`：`orders` 表按 `pay_time` 过滤时未命中索引。" />
</p>
```

- **解析规则**:只认反引号一种标记。`**` / `_` / 链接语法一律按字面输出。落单的反引号、空码片（相邻两个反引号）按字面输出，不吞后文；`\`` 转义成一个反引号字符，不开片。
- **约束**:渲染成 Fragment 而非块级元素，外层是 `<p>` 还是表格单元格由调用方决定。**完整形态见 Storybook `CloudAI UI/Console/InlineMarkup 内联码片`**。
