# SvgIcon

- **何时用**:需要以**数据驱动的动态尺寸**渲染图标(SVG 或 Lucide)时。若尺寸固定,直接用 `<Icon className="size-4" />` 即可,无需本组件。
- **安装**:`npx shadcn@3 add @cloudai/svg-icon`。
- **导入**:`import { SvgIcon } from '@/components/ui/svg-icon'`。
- **依赖**:无(仅 `react` + `cn`)。
- **关键 props**:
  | prop   | 类型                            | 说明                                              |
  | ------ | ------------------------------- | ------------------------------------------------- |
  | `icon` | `React.ComponentType<SVGProps>` | 图标组件(自定义 SVG 或 Lucide);不传渲染 `null`    |
  | `size` | `number \| string`              | 数字按 px,字符串如 `'1rem'`;不传由 className 控制 |
  | 其余   | `svg` props                     | 透传,如 `className`、`onClick`                    |
- **最小示例**:

```tsx
<SvgIcon icon={Search} size={20} className="text-muted-foreground" />
```

- **约束**:颜色用 `text-*` token 类,不要用 `size` 传颜色;`icon` 必须能接受 SVG props。
