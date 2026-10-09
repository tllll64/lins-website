# MessagePrompt

- **何时用**:需要状态消息弹窗(warning/error/success/info)时。提供**声明式受控组件** `<MessagePrompt>` 与**命令式函数** `messagePrompt()` 两种用法。
- **安装**:`npx shadcn@3 add @cloudai/message-prompt`。
- **导入**:`import { MessagePrompt, messagePrompt } from '@/components/ui/message-prompt'`。
- **依赖**:官方 shadcn `button`、`dialog`;`lucide-react`、`class-variance-authority`。
- **关键 props / options**:
  | 名称                    | 类型                                          | 说明                                          |
  | ----------------------- | --------------------------------------------- | --------------------------------------------- |
  | `variant`               | `'warning' \| 'error' \| 'success' \| 'info'` | 状态,决定图标与配色,默认 `warning`            |
  | `title`                 | `ReactNode`                                   | 标题,默认按 variant 取「提示/错误/成功/信息」 |
  | `desc`                  | `ReactNode`                                   | 补充描述                                      |
  | `message`               | `ReactNode`                                   | **必填**,主体消息                             |
  | `hideFooter`            | `boolean`                                     | 隐藏底部按钮区,默认 `false`                   |
  | `okText`                | `string`                                      | 确定按钮文案,默认「确定」                     |
  | `open` / `onOpenChange` | 受控                                          | **仅声明式** `<MessagePrompt>` 使用           |
- **最小示例**:

```tsx
// 声明式(可继承 Context,推荐需要主题/i18n 时)
<MessagePrompt
  open={open}
  onOpenChange={setOpen}
  variant="error"
  message="操作失败"
/>;

// 命令式(便捷,但脱离 Context)
messagePrompt({ variant: 'warning', message: '确定要继续吗?' });
```

- **约束**:命令式 `messagePrompt()` 通过 `createRoot` 独立根渲染,**不继承**调用处 Context(主题/i18n/Provider);需要 Context 时改用声明式组件(见 DEC-011)。
