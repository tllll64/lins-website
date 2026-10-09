# EntityIdentity

- **何时用**:实例 / 库 / 表 / 引擎等**资源身份**——类型图标 + 主名称，下面一行放辅助 ID、状态小片与关键属性。人用 `UserIdentity`。已有 `@cloudai/entity-identity` 时优先安装，勿手搓「图标+两行字」。
- **安装**:`npx shadcn@3 add @cloudai/entity-identity`
- **导入**:`import { EntityIdentity } from '@/components/ui/entity-identity'`
- **依赖**:`@cloudai/engine-icon`（后端类型 → 引擎图）；`lucide-react`（语义表与未知兜底）；`@cloudai/status-badge`（`badges`）
- **导出**:`EntityIdentity`；类型 `EntityIdentityProps` / `EntityIdentityVariant` / `EntityIdentityBadge` / `EntityIdentityAttribute` / `EntityIdentityDetail` / `EntityIdentityAction` / `EntityIdentityEngineIcon`
- **关键 props**:
  | prop            | 类型                                       | 说明                                                                                                                                                                            |
  | --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `engine`        | `string?`                                  | 与后端数据库类型同名（如 `PolarDB` / `mysql`），先查 `@cloudai/engine-icon`；再查 lucide 语义表 `database` / `table` / `instance` / `server` / `cluster`；否则 Database，不抛错 |
  | `icon`          | `ReactNode?`                               | 覆盖引擎图（不含 48 底）                                                                                                                                                        |
  | `engines`       | `Record<string, ComponentType<SVGProps>>?` | 产品私有引擎图 overlay                                                                                                                                                          |
  | `name`          | `string`                                   | 主名称                                                                                                                                                                          |
  | `variant`       | `"inline" \| "card"?`                      | 默认 `inline` 随文排一行；`card` 自带卡面与右上图标钮                                                                                                                           |
  | `secondary`     | `string?`                                  | 主名下那一行的第一段：辅助 ID / 技术名                                                                                                                                          |
  | `badges`        | `{ text, status?, shape? }[]?`             | 同一行的状态小片。`shape` 默认 `pill`（带状态图标、圆角，给运行中、高危这类实时状态）；`flat` 无图标方角，给 L2、生产这类静态标记                                               |
  | `attributes`    | `{ label, value?, icon? }[]?`              | 同一行的短属性对，渲染成「label value」                                                                                                                                         |
  | `details`       | `{ label, value? }[]?`                     | **仅 `card`**：分隔线下方的两列 key/value 表，适合较长键值。传了才画分隔线                                                                                                      |
  | `headerActions` | `{ icon, label, href?, onClick? }[]?`      | **仅 `card`**：头部右上的 24×24 图标钮，`label` 作无障碍名称                                                                                                                    |
  | 其余            | `div` props                                | `className` 用 `cn()` 合并                                                                                                                                                      |
- **主名下面只有一行**:`secondary` → `badges` → `attributes` 按这个固定顺序排在同一条竖线分隔链上，放不下时逐项折行。**没有密度开关**：排版由填了哪几段决定，不想露某一段就别传，组件不会替你藏。
- **最小示例**:

```tsx
<EntityIdentity
  engine="PolarDB"
  name="库存日余额实施库"
  secondary="inventory_fact_inventory_daily_balance"
/>
<EntityIdentity
  engine="database"
  name="库存日余额实施库"
  secondary="rm-2ze916p38915ik7q6"
  badges={[{ text: "高危", status: "warning-high" }]}
  attributes={[{ label: "cn-hangzhou" }]}
/>
<EntityIdentity
  variant="card"
  engine="PolarDB"
  name="polardb-prod-order"
  secondary="pc-2ze916p38915ik7q6"
  badges={[{ text: "生产", status: "warning-low", shape: "flat" }]}
  details={[{ label: "地域", value: "华东 1（杭州）" }]}
/>
```

- **约束**:`engine` 大小写敏感，与 `engine-icon` 的 `name` 一致。包里没有的私有引擎走 `engines` overlay。同一条信息不要既写进 `attributes` 又写进 `details`。不要把整段问答收成 Identity。**完整形态见 Storybook `CloudAI UI/Console/EntityIdentity 实体身份`**。
