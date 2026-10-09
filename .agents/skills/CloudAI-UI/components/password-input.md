# PasswordInput

- **何时用**:需要密码输入且带显隐切换按钮时。基于 shadcn `Input` 封装,默认右侧 Eye 图标切换 `type`。
- **安装**:`npx shadcn@3 add @cloudai/password-input`。
- **导入**:`import { PasswordInput } from '@/components/ui/password-input'`。
- **依赖**:官方 shadcn `input`、`lucide-react`。
- **关键 props**:
  | prop         | 类型          | 说明                         |
  | ------------ | ------------- | ---------------------------- |
  | `showToggle` | `boolean`     | 是否显示切换按钮,默认 `true` |
  | 其余         | `Input` props | 透传,不含 `type`(内部管理)   |
- **最小示例**:

```tsx
<PasswordInput placeholder="请输入密码" />
```

- **约束**:不要传 `type`;禁用态会同时禁用切换按钮。
