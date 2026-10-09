# UserIdentity

- **何时用**:Owner / 创建人 / 负责人等**人的只读身份**——头像 + 显示名，可选账号。资源用 `EntityIdentity`。已有 `@cloudai/user-identity` 时优先安装，勿手搓头像+两行字。
- **安装**:`npx shadcn@3 add @cloudai/user-identity`
- **导入**:`import { UserIdentity } from '@/components/ui/user-identity'`
- **依赖**:`@cloudai/avatar-pro`
- **导出**:`UserIdentity`；类型 `UserIdentityProps` / `UserIdentityDensity`
- **关键 props**:
  | prop          | 类型                      | 说明                          |
  | ------------- | ------------------------- | ----------------------------- |
  | `displayName` | `string`                  | 显示名                        |
  | `avatarSrc`   | `string?`                 | 传给 AvatarPro 的真实头像 URL |
  | `avatar`      | `ReactNode?`              | 覆盖默认头像                  |
  | `accountId`   | `string?`                 | 账号；紧凑态不展示            |
  | `density`     | `"default" \| "compact"?` | 不传则有 accountId 时 default |
  | 其余          | `div` props               | `className` 用 `cn()` 合并    |
- **最小示例**:

```tsx
<UserIdentity displayName="Erinyu" accountId="2061323342" />
<UserIdentity displayName="Erinyu" density="compact" />
```

- **约束**:主 API 是字符串（`avatarSrc` URL），不要传 React 头像组件当默认路径。无图时默认复用 `AvatarPro variant="letter-soft"`；组合内头像按装饰元素隐藏，身份名称由相邻文本提供。`avatar` 仍是完全覆盖头像的逃逸插槽。选择器 / 成员列表里可作为内容单元，本身不是选择控件。**完整形态见 Storybook `CloudAI UI/Console/UserIdentity 用户身份`**。
