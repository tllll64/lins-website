# MessageBar

- **何时用**:整行**风险/提示条**（非 toast）——四档状态底 + 正文 + 可选右侧行动链接。正文与行动区走子组件，勿用 `actions?: ReactNode`。
- **安装**:`npx shadcn@3 add @cloudai/message-bar`
- **导入**:`import { MessageBar, MessageBarBody, MessageBarActions, MessageBarAction } from '@/components/ui/message-bar'`
- **依赖**:`@radix-ui/react-slot`（`MessageBarAction` 的 `asChild`）；`lucide-react`（内置 `ArrowUpRight`）
- **导出**:`MessageBar` / `MessageBarBody` / `MessageBarActions` / `MessageBarAction`
- **关键 props**:

  | prop                    | 类型                                                              | 说明                                                        |
  | ----------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
  | `status`（Root）        | `"normal" \| "warning-low" \| "warning-medium" \| "warning-high"` | 默认 `"normal"`                                             |
  | `gradient`（Root）      | `boolean`                                                         | 默认 `true`；`false` 为纯色底                               |
  | Body / Actions / Action | 子组件                                                            | 正文 90% 不透明度写在 Body；Action 内置箭头，支持 `asChild` |
  | 其余                    | `div` / `button` props                                            | 透传                                                        |

- **最小示例**:

```tsx
<MessageBar status="normal">
  <MessageBarBody>本次盘点额度充足…</MessageBarBody>
  <MessageBarActions>
    <MessageBarAction asChild>
      <a href="/quota">额度详情</a>
    </MessageBarAction>
    <MessageBarAction onClick={onBuy}>购买更多</MessageBarAction>
  </MessageBarActions>
</MessageBar>
```

- **约束**:
  - **不要**在根上写 `opacity-*`（会把行动链接一起变淡）。
  - `from-*` 只能消费颜色 stop，不能消费完整 background image。先在 `design-system/color.md` 判断语义，再搜索 `themes/<brand>-tokens.md` 确认当前 brand 的准确 usage；若目标 `*-background` 是 background image，请传 **`gradient={false}`** 走纯色退路。
  - 非整条 `role="alert"`；需播报由业务传 `role` / `aria-live`。
  - **完整交互见 Storybook `CloudAI UI/Console/MessageBar 消息条`**。
