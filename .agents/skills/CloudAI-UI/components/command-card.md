# CommandCard

- **何时用**:需要**可复用的选择列表面板**（无触发器）时——自定义 Popover / Drawer 内嵌单选/多选/搜索列表，或复用 `useSelectData` 做异步 options + label 缓存。已被 `SelectProV2` / `FilterGroupV2` 作为底座复用；业务也可直接安装。
- **何时不用**:
  - 标准表单下拉（触发器 + 清除 + tag 多选等）→ [`SelectProV2`](select-pro-v2.md)
  - 列表页多条件筛选条 → [`FilterGroupV2`](filter-group-v2.md)
  - AI `/` 快捷指令或 `@` 对象菜单 → [`AiQuickCommand`](ai-quick-command.md)（**不要**混用本组件）
- **安装**:`npx shadcn@3 add @cloudai/command-card`（会带上官方 shadcn `checkbox`、`command`、`input-group`）。
- **导入**:`import { SingleCommandCard, MultipleCommandCard, SearchCommandCard, useSelectData, type CommandItem } from '@/components/ui/command-card'`。
- **依赖**:官方 shadcn `checkbox`、`command`、`input-group`；`lucide-react`。
- **关键导出**:
  | 导出                  | 说明                                                                                                                        |
  | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
  | `SingleCommandCard`   | 单选列表（Check 标记）                                                                                                      |
  | `MultipleCommandCard` | 多选列表（Checkbox）                                                                                                        |
  | `SearchCommandCard`   | 顶部搜索框 + 单/多选列表；`searchKey` 受控，**卡内不发请求**                                                                |
  | `useSelectData`       | 静态数组过滤或异步 `dataSource` + 可选缓存；返回 `options` / `loading` / `resolveLabel` / `refresh`                         |
  | `useResetOnClose`     | 面板关闭时清空 state（如搜索词）                                                                                            |
  | `select-value-utils`  | 与 SelectProV2 / FilterGroupV2 同款 value/labelInValue 语义；完整交互以 Storybook **`CloudAI UI/Console/SelectProV2`** 为准 |
- **关键 props**（三卡共用底座 + 各自差异；完整演示见 Storybook **`CloudAI UI/Console/CommandCard 选择面板底座`**）:
  | prop                              | 类型               | 说明                                          |
  | --------------------------------- | ------------------ | --------------------------------------------- |
  | `options`                         | `CommandItem[]`    | 列表数据；`{ label, value, disabled? }`       |
  | `value` / `onChange`              | 见各卡             | 单选为标量；多选为数组；`onChange` 带 records |
  | `loading`                         | `boolean`          | 且 `options` 为空时显示 `loading...`          |
  | `maxRow` / `rowHeight`            | `number`           | 可见行数与行高；超出列表内滚动                |
  | `itemRender` / `footer`           | `fn` / `ReactNode` | 自定义行与底部插槽                            |
  | `searchKey` / `onSearchKeyChange` | Search 卡          | 搜索词受控                                    |
  | `selectMode`                      | Search 卡          | `'single' \| 'multiple'`                      |
- **最小示例**:

```tsx
import { SingleCommandCard, type CommandItem } from '@/components/ui/command-card'

const options: CommandItem[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
]

<SingleCommandCard
  options={options}
  value={value}
  onChange={(next) => setValue(next)}
  maxRow={6}
/>
```

```tsx
import { SearchCommandCard, useSelectData } from '@/components/ui/command-card'

const { options, loading } = useSelectData({
  dataSource: (searchKey) => fetchCities(searchKey),
  searchKey,
  cacheOptions: true,
})

<SearchCommandCard
  selectMode="single"
  searchKey={searchKey}
  onSearchKeyChange={setSearchKey}
  options={options}
  loading={loading}
  value={value}
  onChange={(next) => setValue(next as string)}
/>
```

- **约束**:卡片是 dumb 面板，**不包含**触发器 / Popover；组合时 PopoverContent 建议 `p-0` + 透明底，让卡片自带边框生效（见 Storybook `InPopover`）。样式仅 DESIGN token；可见默认文案英文（DEC-021）。
