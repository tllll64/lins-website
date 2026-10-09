# AvatarPro

- **何时用**:用户头像。需要显示姓名首字、内置用户图标、稳定自动分配的抽象渐变或真实照片时使用；产品、资源和引擎身份不要使用。
- **安装**:`npx shadcn@3 add @cloudai/avatar-pro`
- **导入**:`import { AvatarPro } from '@/components/ui/avatar-pro'`
- **依赖**:`class-variance-authority`、`lucide-react`
- **导出**:`AvatarPro`；类型 `AvatarProProps` / `AvatarProVariant` / `AvatarProSize`
- **关键 props**:
  | prop          | 类型                                                               | 说明                                     |
  | ------------- | ------------------------------------------------------------------ | ---------------------------------------- |
  | `name`        | `string`                                                           | 必填；首字、可访问名称和缺省选色种子     |
  | `src`         | `string?`                                                          | 真实头像 URL；失败时自动回退到 variant   |
  | `variant`     | `"letter" \| "letter-soft" \| "icon" \| "icon-soft" \| "gradient"` | 默认 `letter-soft`                       |
  | `identityKey` | `string?`                                                          | `gradient` 的稳定选色种子；默认使用 name |
  | `size`        | `"sm" \| "md"`                                                     | 24px / 32px；默认 md                     |
  | 其余          | `span` props（不含 `children`）                                    | `className` 用 `cn()` 合并               |
- **最小示例**:

```tsx
<AvatarPro name="Erinyu" />
<AvatarPro name="Erinyu" identityKey="user-2061323342" variant="gradient" />
<AvatarPro name="Erinyu" src={avatarUrl} />
```

- **约束**:渐变颜色自动分配，不开放 palette；固定用户图标，不接受 ReactNode；没有 active 或动画 API。业务状态由外层状态组件表达。
