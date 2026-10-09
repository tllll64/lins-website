# CodeBlock

- **何时用**:AI 回复里的**代码块 / 终端 / 代码+执行结果**。复合组件族；**零语法高亮依赖**——高亮器由业务注入。
- **安装**:`npx shadcn@3 add @cloudai/code-block`（目录 item → `components/ui/code-block/`）
- **导入**:`import { CodeBlock, CodeBlockHeader, CodeBlockTitle, CodeBlockActions, CodeBlockAction, CodeBlockCopyButton, CodeBlockCode, CodeBlockPanel, useCopyToClipboard } from '@/components/ui/code-block'`
- **依赖**:`lucide-react`（复制按钮图标）。**不含** prism / shiki。
- **导出**:上表全部 + 类型 `CodeBlockHighlighter` / `CodeBlockVariant`
- **关键 props**:

  | prop                                            | 类型                      | 说明                             |
  | ----------------------------------------------- | ------------------------- | -------------------------------- |
  | `variant`（Root）                               | `"default" \| "terminal"` | `terminal` 根节点挂 `dark` class |
  | `highlight`（Root 或 Code）                     | `(ctx) => ReactNode`      | 可选；不传即纯文本               |
  | `code` / `language` / `showLineNumbers`（Code） | string / string / boolean | 行号默认 `true`；与软换行互斥    |
  | `value`（CopyButton）                           | `string`                  | 要复制的文本                     |
  | Panel                                           | 容器                      | 只提供 `border-t`；表格业务自填  |

- **最小示例**:

```tsx
<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>SQL</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={sql} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockCode code={sql} language="sql" />
</CodeBlock>
```

- **高亮 recipe A（推荐，轻量）**:

```tsx
import { Highlight, themes } from 'prism-react-renderer';
import type { CodeBlockHighlighter } from '@/components/ui/code-block';

const highlight: CodeBlockHighlighter = ({ code, language, dark }) => (
  <Highlight
    code={code}
    language={language ?? 'text'}
    theme={dark ? themes.vsDark : themes.github}
  >
    {({ tokens, getLineProps, getTokenProps }) => (
      <>
        {tokens.map((line, i) => (
          <div key={`line-${i + 1}`} {...getLineProps({ line })}>
            {line.map((token, k) => (
              <span key={`t-${i + 1}-${k}`} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </>
    )}
  </Highlight>
);
```

- **高亮 recipe B（Shiki 同步细粒度）**:用 `createHighlighterCoreSync` + `createJavaScriptRegexEngine`，避免 WASM 与 async；主题按 `dark` 切换。体积更大，仅在需要 VS Code 级准确度时使用。

- **结果表 recipe**:`CodeBlockPanel` 内放官方 shadcn `<Table>`，表头/单元格加 `font-mono text-xs text-secondary-foreground` 与右边框即可；**不要**在 code-block 里造第二套表格。

- **约束**:
  - `showLineNumbers` 与软换行互斥（双列布局）；若将来加 `wrap`，为真时须忽略行号。
  - terminal **禁止硬编码暗色 hex**——靠根节点 `dark`。代码区/结果区的表面 token 随 variant 切换：terminal 用 `bg-background` + `text-foreground`（#0A0A0A / #FAFAFA），default 用 `bg-card` + `text-secondary-foreground`；header 两者同为 `bg-muted`。注入高亮器后正文颜色由高亮主题接管。
  - **提升条件**：三个以上业务仓抄了同一份 prism recipe 时，再沉淀为独立 `@cloudai/code-highlight` item；在此之前只给 recipe。
  - **完整交互见 Storybook `CloudAI UI/Console/CodeBlock 代码块`**。
