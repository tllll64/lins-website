# ResourceCard

- **何时用**:渠道/实例/资源等**实体卡片**列表——图标 + 标题 + 描述,右上角内置受控开关(启用/停用)或自传操作节点(如 ⋯ 菜单/图标按钮组);底部一排键值信息,容器变窄时溢出项自动收进 `CollapsedInfo`。整套 props 驱动,不用手搓 card + switch + popover。
- **安装**:`npx shadcn@3 add @cloudai/resource-card`。
- **导入**:`import { ResourceCard, ResourceCardGrid, ResourceCardCreate } from '@/components/ui/resource-card'`。
- **依赖**:官方 shadcn `switch`;harness `@cloudai/simple-tooltip`、`@cloudai/collapsed-info`;`@radix-ui/react-use-controllable-state`。(⋯ 菜单不内置,由业务在 `actions` 里自传 DropdownMenu——真实菜单常有分隔线/危险项,内置 schema 表达不了,DEC-062。)
- **导出**:`ResourceCard`(单卡)、`ResourceCardGrid`(网格布局)、`ResourceCardCreate`(创建入口卡)。
- **关键 props(ResourceCard)**:
  | prop                                | 类型                       | 说明                                                                                                                                                                                           |
  | ----------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `icon` / `title` / `description`    | `React.ReactNode`          | 头部图标、标题、描述                                                                                                                                                                           |
  | `titleAction`                       | `React.ReactNode`          | 紧贴标题右侧的小操作(如编辑图标)                                                                                                                                                               |
  | `cornerBadge`                       | `React.ReactNode`          | 右上角角标(渐变 ribbon/免费剩余/企业版等),组件自带 relative+overflow-hidden 随圆角裁剪;渐变/图标/文字自传 JSX                                                                                  |
  | `switchProps`                       | `ResourceCardSwitchProps`  | 传入即渲染内置受控 Switch;`tooltip` 可传 `ReactNode` 或 `(checked: boolean) => ReactNode`(函数形式随开关状态实时求值,如 `(c) => c ? "点击停用" : "点击启动"`;文案全部外部传入、组件不内置默认) |
  | `headerControl`                     | `React.ReactNode`          | 自定义右侧**控件**(常显),覆盖内置 Switch;与 `actions` 区别:控件语义、在右侧最外侧、无 stopPropagation                                                                                          |
  | `actions`                           | `React.ReactNode`          | 自传右上**操作**(如自写 DropdownMenu / 图标按钮组);自带 stopPropagation、可配合 `actionsOnHover` 悬浮显示;与 `headerControl` 区别:操作语义、在开关左侧                                         |
  | `actionsOnHover`                    | `boolean`                  | actions 悬浮才显示(菜单自管显隐时可不传)                                                                                                                                                       |
  | `description`                       | `React.ReactNode`          | 简短描述(截断两行)                                                                                                                                                                             |
  | `contentHeight`                     | `number \| string`         | header 与 footer 之间内容区最小高度,默认 `0`;>0 撑高使 footer 沉底(替代旧的 `min-h-40 justify-between` 写法)                                                                                   |
  | `overlay`                           | `boolean`                  | 表面蒙层,默认 `false`;开启后卡面使用由 `brand-background`、`card`、`accent` 组成的静态渐变                                                                                                     |
  | `footer`                            | `ResourceCardFooterItem[]` | 底部信息项 `{ key, label?, content, tooltip? }`,横排「｜」分隔,溢出收进 CollapsedInfo;`content` 行内+收起态共用(可放「图标+文字」),`label` 收起态键名,`tooltip` 行内悬浮提示                   |
  | `maxInlineCount` / `collapsedTitle` | `number` / `string`        | 行内最多项数 / 收起 Popover 标题                                                                                                                                                               |
  | 其余                                | `div` props                | `className` 用 `cn()` 合并,其余透传(`title` 已被组件接管)                                                                                                                                      |
- **关键 props(ResourceCardGrid)**:`columns`(视口断点列数,`number \| { base?, sm?, md?, lg?, xl? }`)与 `minItemWidth`(容器宽度 auto-fill 折行,传入优先)二选一;`gap` 卡片间距。单列铺满用 `columns={1}`(卡片默认 w-full 撑满容器)。
- **关键 props(ResourceCardCreate)**:`onClick`(整卡点击,内置 Enter/Space 键盘触发)、`backgroundImage`(背景图 url,作为卡面背景)、`children`(自定义内容)。边框与 `ResourceCard` 一致:默认使用 `border`，hover 使用 `brand`。
- **最小示例**:

```tsx
<ResourceCardGrid minItemWidth={240} gap={3}>
  <ResourceCardCreate onClick={handleCreate}>
    <Plus className="h-6 w-6" />
    <span className="text-sm font-medium">添加渠道</span>
  </ResourceCardCreate>
  <ResourceCard
    icon={<MessageSquare className="h-5 w-5" />}
    title="钉钉"
    description="DingTalk 企业机器人渠道。"
    switchProps={{
      defaultChecked: true,
      tooltip: (checked) => (checked ? '点击停用' : '点击启动'),
    }}
    actions={<MyCardMenu />}
    footer={[{ key: 'auth', label: '认证方式', content: 'API 密钥认证' }]}
  />
</ResourceCardGrid>
```

- **约束**:`switchProps` 与 `headerControl` 只取其一(headerControl 优先);⋯ 菜单/操作走 `actions`(自传 DropdownMenu,自管打开态显隐时可不用 `actionsOnHover`);footer 每项 `content` 行内与收起态共用、`label` 仅收起态键名、`tooltip` 行内悬浮提示(SimpleTooltip 包裹)。`cornerBadge` 角标绝对定位右上角、随圆角裁剪,**勿与右上角操作同时用**(位置重叠);固定高度 + footer 沉底用 `contentHeight`(默认 0)撑高内容区实现;边框默认 `border-border`，hover 直接使用 `border-brand`，不带描边动画。`overlay` 的卡面渐变由组件内部组合 `brand-background`、`card` 与 `accent`，可由 `style.backgroundImage` 覆盖。状态徽标请用 DESIGN 规范的 status pill(`rounded-xl px-2` + 三令牌 + dark 覆盖),勿手搓 `rounded-md`。**完整交互见 Storybook `CloudAI UI/Console/ResourceCard`**(含「默认」、「实例卡与角标」、「Footer 溢出」、「开关与操作区」、「单列列表」、「网格与创建卡」、「创建卡片」)。

---
