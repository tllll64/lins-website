# AiQuickCommand

- **何时用**:输入框上方浮现的**指令/对象选择菜单面板**(输入侧 B3,DEC-037)——`/` 快捷指令菜单(预设任务列表)与 `@` 对象选择菜单(tab 分类 + 对象行 + 键盘提示 footer)两场景同构,同一组件族覆盖。复合组件族:`AiQuickCommand`(面板,包 cmdk `Command`)/ `AiQuickCommandTabs` + `AiQuickCommandTab`(可选分类,激活项胶囊描边)/ `AiQuickCommandList` / `AiQuickCommandGroup` / `AiQuickCommandItem`(富/简双密度)+ `AiQuickCommandItemIcon` / `AiQuickCommandEmpty` / `AiQuickCommandFooter` + `AiQuickCommandHint`(kbd 键盘提示)。
- **安装**:`npx shadcn@3 add @cloudai/ai-quick-command`(会自动带上官方 shadcn `command`)。
- **导入**:`import { AiQuickCommand, AiQuickCommandTabs, AiQuickCommandTab, AiQuickCommandList, AiQuickCommandGroup, AiQuickCommandItem, AiQuickCommandItemIcon, AiQuickCommandEmpty, AiQuickCommandFooter, AiQuickCommandHint } from '@/components/ui/ai-quick-command'`。
- **依赖**:`cmdk`、`@radix-ui/react-use-controllable-state`;registry 依赖官方 shadcn `command`。
- **关键 props**:
  | prop                                       | 类型                       | 说明                                                                                               |
  | ------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------- |
  | `value` / `onValueChange`                  | Root,cmdk 受控高亮         | 高亮项受控;不传时 cmdk 内部管理(↑↓ 与 hover 均会更新)                                              |
  | `shouldFilter`                             | Root,`boolean`             | 是否用 cmdk 内置过滤,**默认 `false`**(菜单场景列表通常业务算好再传);其余 cmdk `Command` props 透传 |
  | `value` / `defaultValue` / `onValueChange` | Tabs                       | 激活 tab,受控/非受控均可(`useControllableState`);←/→ 循环切换(跳过 disabled)                       |
  | `value`                                    | Tab,`string`               | **必填**;`data-state="active\|inactive"` 暴露;点击不夺取焦点                                       |
  | `variant`                                  | Item,`'rich' \| 'compact'` | `rich` = icon 块 + 标题 + 描述两行(高亮时 icon 转 brand);`compact` = 单行(默认)                    |
  | `description`                              | Item,`ReactNode`           | muted 补充说明:compact 同行尾随,rich 第二行                                                        |
  | `value` / `onSelect`                       | Item,cmdk props            | `value` 须唯一;Enter/点击触发 `onSelect(value)`                                                    |
  | `keys`                                     | Hint,`ReactNode[]`         | 按键符号(如 `["←","→"]`),逐个渲染为 `<kbd>`;label 经 children 传入(DEC-021)                        |
- **最小示例**(`@` 对象菜单 + 输入框组合 recipe):

```tsx
<div className="relative">
  {open && (
    <AiQuickCommand ref={panelRef} className="absolute bottom-full mb-2 w-full">
      <AiQuickCommandTabs value={tab} onValueChange={setTab}>
        <AiQuickCommandTab value="rds">RDS</AiQuickCommandTab>
        <AiQuickCommandTab value="polardb">PolarDB</AiQuickCommandTab>
      </AiQuickCommandTabs>
      <AiQuickCommandList>
        {instances.map((it) => (
          <AiQuickCommandItem
            key={it.id}
            value={it.id}
            description={it.desc}
            onSelect={() => insert(it)}
          >
            {it.name}
          </AiQuickCommandItem>
        ))}
        <AiQuickCommandEmpty>未找到匹配对象</AiQuickCommandEmpty>
      </AiQuickCommandList>
      <AiQuickCommandFooter>
        <AiQuickCommandHint keys={['←', '→']}>切换Tab</AiQuickCommandHint>
        <AiQuickCommandHint keys={['↑', '↓']}>切换对象</AiQuickCommandHint>
        <AiQuickCommandHint keys={['↵']} className="ml-auto">
          打开
        </AiQuickCommandHint>
      </AiQuickCommandFooter>
    </AiQuickCommand>
  )}
  <AiPromptInput>…</AiPromptInput>
</div>
```

- **约束**:**runtime 无关(DEC-035)**——`/`、`@` 的**触发检测**(输入监听/光标位置/开合时机)、**面板定位**(组件是普通块级元素,不内置 Popover,业务自行绝对定位或自包浮层)、**选中后的文本插入**全归业务;pill 行内混排走 DEC-038 spike 线,本期 `onSelect` 抛值、业务插纯文本;**模糊搜索的匹配与高亮归业务**(`shouldFilter` 默认 false 外部过滤,命中字符 brand 高亮在 item children 里自行渲染,组件不内置字符串切分);**无 `items`/`tabs` 配置式 API**,全部 children 组合(DEC-036)。键盘导航基于 cmdk(↑↓ 高亮、Enter 选中、hover 跟随),**焦点始终留在业务 textarea**——业务在 textarea `onKeyDown` 里把导航键转发进面板(recipe 见 Storybook「键盘转发 recipe」):

```tsx
// 业务仓胶水(recipe):菜单 open 时把导航键经 dispatchEvent 转发,焦点不转移
<textarea
  onKeyDown={(event) => {
    if (!open) return;
    const keys = ['ArrowUp', 'ArrowDown', 'Enter', 'ArrowLeft', 'ArrowRight'];
    if (!keys.includes(event.key)) return;
    event.preventDefault(); // open 时 Enter = 选中而非发送/换行;闭合后恢复发送——判断归业务
    panelRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', { key: event.key, bubbles: true }),
    );
  }}
/>
```

Footer 提示文案("切换Tab"/"打开")由业务经 children 传入,组件只提供排版与 kbd 视觉(DEC-021)。Tab 切换反馈按输入方式区分:键盘 `←/→` 即时完成,指针点击保留短距离连续动效；`prefers-reduced-motion` 下均即时完成(DEC-091)。**完整交互见 Storybook `CloudAI UI/Agent Chat/AiQuickCommand`**。

---
