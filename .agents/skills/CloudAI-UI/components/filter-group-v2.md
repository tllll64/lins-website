# FilterGroupV2

- **何时用**:列表页多条件筛选条（Popover 组合）；编排 showKeys / filters；单项支持 `select` / `date` / `dateRange`（DEC-048）。
- **安装**:`npx shadcn@3 add @cloudai/filter-group-v2`（不覆盖业务仓旧 `filter-group`；会带上 shadcn `popover`、`calendar`、`@cloudai/command-card`）。
- **导入**:`import { FilterGroupV2, FilterBoxV2 } from '@/components/ui/filter-group-v2'`。
- **依赖**:共享底座 [`command-card`](command-card.md)（选择面板 + `useSelectData`）；官方 shadcn `popover`、`calendar`（官方 `calendar` 现随 `react-day-picker@latest`，多为 **v9/v10**）。日期面板日历焦点用 **`autoFocus`**（day-picker v10 已移除 `initialFocus`；若业务仓仍是 v8 且类型报错，把 `autoFocus` 改回 `initialFocus`，或升级 day-picker / 重装官方 calendar）。
- **关键 props**:
  | prop                                 | 类型                                | 说明                                                      |
  | ------------------------------------ | ----------------------------------- | --------------------------------------------------------- |
  | `allFilters`                         | `Record<string, FilterBoxConfigV2>` | 可配置筛选项字典                                          |
  | `showKeys` / `filters`               | `string[]` / `FiltersV2`            | 受控展示 key 与各筛选项值                                 |
  | `defaultShowKeys` / `defaultFilters` | 同上                                | 非受控初始值                                              |
  | `defaultShowCount`                   | `number`                            | **空态**被点开时一次展开前 N 项，默认 3                   |
  | `maxInlineCount`                     | `number`                            | 出「+」的阈值：`allFilters` 项数超过它才渲染 Plus，默认 3 |
  | `requiredCondition`                  | `string[]`                          | 这些 key 展示时不可删（无 X），也不被「清空」带走         |
  | `labelInValue` / `cacheOptions`      | `boolean`                           | 组级默认，FilterBox 可覆盖                                |
- **起手式：`showKeys` 给空数组。** 三段式是 `[]` →「筛选」入口 → 点一次展开前 `defaultShowCount` 项，
  项数多于 `maxInlineCount` 时右侧还有「+」继续加。**别一开始就把 key 填上**：填了就直接跳到第三段，
  既看不到入口，`allFilters` 项数又没超过 `maxInlineCount` 的话连「+」都不出，剩下的筛选项点不到。
  要开局就钉住某一项，把它同时写进初始 `showKeys` 与 `requiredCondition`，并确认 `allFilters` 的项数
  超过 `maxInlineCount`。
- **FilterBox 日期字段**（`type: "date" | "dateRange"`）:
  | 字段                            | 说明                                                                                                           |
  | ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
  | `precision`                     | `"day"`（默认）\| `"second"`                                                                                   |
  | 时间点值                        | `day` → `YYYY-MM-DD`；`second` → `YYYY-MM-DDTHH:mm:ss`（**本地墙钟**，禁止 `toISOString`）                     |
  | 区间值                          | `{ from, to }`，两端齐全才写入；面板用 Start/End 双槽点选编辑；关面板丢弃草稿                                  |
  | `datePresets`                   | `{ label; getValue: () => ({ from: Date; to?: Date }) }[]`，业务本地时计算                                     |
  | `disabledDate` / `defaultMonth` | 可选；禁用日 / 打开时默认月份                                                                                  |
  | 秒级交互                        | 左 Calendar + 右时分秒列 + OK；选日不关板，点 OK 才提交；默认点 `00:00:00`、区间 `from 00:00:00`/`to 23:59:59` |
- **最小示例**:

```tsx
<FilterGroupV2
  allFilters={{
    region: { title: '地域', dataSource: options },
    createdAt: { title: '创建日期', type: 'date', precision: 'day' },
    createdRange: {
      title: '创建区间',
      type: 'dateRange',
      precision: 'day',
      datePresets: [
        {
          label: '今天',
          getValue: () => {
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            const end = new Date();
            end.setHours(23, 59, 59, 0);
            return { from: start, to: end };
          },
        },
      ],
    },
  }}
  showKeys={showKeys} // 起始 useState<string[]>([])，不是 ['region', ...]
  filters={filters} // 起始 {}
  onShowKeysChange={setShowKeys}
  onChange={setFilters}
/>
```

- **约束**:与旧 `filter-group` 并行；`FilterBoxV2` 可单独 import；`select` 须提供 `dataSource`，`date`/`dateRange` 不需要。窄屏默认 **整颗 pill 换行保形**（DEC-046）。日期 format 须本地时，勿用 `toISOString`。**完整交互以 Storybook `CloudAI UI/Console/FilterGroupV2` 日期 stories 为准**。
