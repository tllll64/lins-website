<!-- 由 tools/emitters/skill-tokens.ts 从 brands/aidbs/tokens/figma/aidbs-Light.tokens.json / brands/aidbs/tokens/figma/aidbs-Dark.tokens.json 生成，勿手改 -->

# 完整语义 token 参考（aidbs）

取值来自 Figma Mode `Data AI Studio-Light` / `Data AI Studio-Dark`，共 80 个 token。
**这是本品牌的实际取值**，不是示例；写死 hex 之前先在这里找语义 token。

color token 可用于任意颜色工具类（`{bg,text,border,ring,fill,stroke,…}-<类名键>`），
值随 `.dark` 自动切换，正常无需写 `dark:`。颜色用法见 `design-system/color.md`。

## 圆角刻度

| 类名         | 值                          |
| ------------ | --------------------------- |
| `rounded-lg` | `var(--radius)`             |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |

## color token（74）

### shadcn 标准 token（31）

| Token                          | 类名键                       | Light                       | Dark                        |
| ------------------------------ | ---------------------------- | --------------------------- | --------------------------- |
| `--accent`                     | `accent`                     | `hsl(240 9.09% 95.69%)`     | `hsl(0 0% 25.1%)`           |
| `--accent-foreground`          | `accent-foreground`          | `hsl(240 4.55% 8.63%)`      | `hsl(0 0% 98.04%)`          |
| `--background`                 | `background`                 | `hsl(0 0% 98.82%)`          | `hsl(0 0% 3.92%)`           |
| `--border`                     | `border`                     | `hsl(220 5.66% 89.61%)`     | `hsl(0 0% 14.9%)`           |
| `--card`                       | `card`                       | `hsl(0 0% 100%)`            | `hsl(0 0% 9.02%)`           |
| `--card-foreground`            | `card-foreground`            | `hsl(240 4.76% 4.12%)`      | `hsl(0 0% 98.04%)`          |
| `--chart-1`                    | `chart-1`                    | `hsl(235.12 93.48% 81.96%)` | `hsl(235.12 93.48% 81.96%)` |
| `--chart-2`                    | `chart-2`                    | `hsl(234.86 22.58% 30.39%)` | `hsl(234.86 22.58% 30.39%)` |
| `--chart-3`                    | `chart-3`                    | `hsl(260.57 92.11% 85.1%)`  | `hsl(260.57 92.11% 85.1%)`  |
| `--chart-4`                    | `chart-4`                    | `hsl(177.76 48.86% 42.94%)` | `hsl(177.76 48.86% 42.94%)` |
| `--chart-5`                    | `chart-5`                    | `hsl(195.19 68.7% 77.45%)`  | `hsl(195.19 68.7% 77.45%)`  |
| `--destructive`                | `destructive`                | `hsl(356.73 90.18% 43.92%)` | `hsl(0 90.6% 70.78%)`       |
| `--foreground`                 | `foreground`                 | `hsl(240 4.76% 4.12%)`      | `hsl(0 0% 98.04%)`          |
| `--input`                      | `input`                      | `hsl(220 5.66% 89.61%)`     | `hsl(0 0% 14.9%)`           |
| `--muted`                      | `muted`                      | `hsl(240 9.09% 95.69%)`     | `hsl(0 0% 14.9%)`           |
| `--muted-foreground`           | `muted-foreground`           | `hsl(240 1.1% 64.31%)`      | `hsl(240 0.83% 52.55%)`     |
| `--popover`                    | `popover`                    | `hsl(0 0% 100%)`            | `hsl(0 0% 14.9%)`           |
| `--popover-foreground`         | `popover-foreground`         | `hsl(240 4.76% 4.12%)`      | `hsl(0 0% 98.04%)`          |
| `--primary`                    | `primary`                    | `hsl(0 0% 9.02%)`           | `hsl(0 0% 89.8%)`           |
| `--primary-foreground`         | `primary-foreground`         | `hsl(0 0% 98.04%)`          | `hsl(0 0% 9.02%)`           |
| `--ring`                       | `ring`                       | `hsl(240 1.1% 64.31%)`      | `hsl(0 0% 45.1%)`           |
| `--secondary`                  | `secondary`                  | `hsl(240 9.09% 95.69%)`     | `hsl(0 0% 14.9%)`           |
| `--secondary-foreground`       | `secondary-foreground`       | `hsl(240 4.76% 4.12%)`      | `hsl(0 0% 98.04%)`          |
| `--sidebar`                    | `sidebar`                    | `hsl(240 100% 99.02%)`      | `hsl(0 0% 9.02%)`           |
| `--sidebar-accent`             | `sidebar-accent`             | `hsl(240 18.18% 95.69%)`    | `hsl(0 0% 14.9%)`           |
| `--sidebar-accent-foreground`  | `sidebar-accent-foreground`  | `hsl(240 13.95% 16.86%)`    | `hsl(0 0% 98.04%)`          |
| `--sidebar-border`             | `sidebar-border`             | `hsl(240 20.75% 89.61%)`    | `hsl(0 0% 13.73%)`          |
| `--sidebar-foreground`         | `sidebar-foreground`         | `hsl(240 13.95% 16.86%)`    | `hsl(264 100% 99.02%)`      |
| `--sidebar-primary`            | `sidebar-primary`            | `hsl(240 13.95% 16.86%)`    | `hsl(236.57 48.61% 28.24%)` |
| `--sidebar-primary-foreground` | `sidebar-primary-foreground` | `hsl(240 100% 99.02%)`      | `hsl(0 0% 98.04%)`          |
| `--sidebar-ring`               | `sidebar-ring`               | `hsl(240 19.78% 64.31%)`    | `hsl(0 0% 32.16%)`          |

### 扩展语义 token（状态 / 分级告警 / 侧栏之外的自定义语义）（21）

| Token                         | 类名键                      | Light                       | Dark                        |
| ----------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `--brand-accent-background`   | `brand-accent-background`   | `hsl(236.25 94.12% 93.33%)` | `hsl(237.22 70.89% 58.24%)` |
| `--brand-accent-foreground`   | `brand-accent-foreground`   | `hsl(235.65 84.93% 71.37%)` | `hsl(234.88 93.18% 82.75%)` |
| `--destructive-foreground`    | `destructive-foreground`    | `hsl(3.16 100% 96.27%)`     | `hsl(0 85.71% 97.25%)`      |
| `--normal`                    | `normal`                    | `hsl(222.09 73.63% 82.16%)` | `hsl(211.7 96.36% 78.43%)`  |
| `--normal-background`         | `normal-background`         | `hsl(213.75 100% 96.86%)`   | `hsl(211.7 96.36% 78.43%)`  |
| `--normal-foreground`         | `normal-foreground`         | `hsl(224.44 64.29% 32.94%)` | `hsl(211.7 96.36% 78.43%)`  |
| `--success`                   | `success`                   | `hsl(95.38 32.77% 76.67%)`  | `hsl(156.2 71.6% 66.86%)`   |
| `--success-background`        | `success-background`        | `hsl(138.46 76.47% 96.67%)` | `hsl(156.2 71.6% 66.86%)`   |
| `--success-foreground`        | `success-foreground`        | `hsl(143.81 61.17% 20.2%)`  | `hsl(156.2 71.6% 66.86%)`   |
| `--unknown`                   | `unknown`                   | `hsl(240 4.88% 83.92%)`     | `hsl(216 12.2% 83.92%)`     |
| `--unknown-background`        | `unknown-background`        | `hsl(0 0% 98.04%)`          | `hsl(216 12.2% 83.92%)`     |
| `--unknown-foreground`        | `unknown-foreground`        | `hsl(240 3.83% 46.08%)`     | `hsl(216 12.2% 83.92%)`     |
| `--warning-high`              | `warning-high`              | `hsl(0 55.56% 80.59%)`      | `hsl(0 90.6% 70.78%)`       |
| `--warning-high-background`   | `warning-high-background`   | `hsl(0 85.71% 97.25%)`      | `hsl(0 90.6% 70.78%)`       |
| `--warning-high-foreground`   | `warning-high-foreground`   | `hsl(0 62.82% 30.59%)`      | `hsl(0 90.6% 70.78%)`       |
| `--warning-low`               | `warning-low`               | `hsl(48.75 52.46% 76.08%)`  | `hsl(48 96.64% 76.67%)`     |
| `--warning-low-background`    | `warning-low-background`    | `hsl(49.57 92% 95.1%)`      | `hsl(48 96.64% 76.67%)`     |
| `--warning-low-foreground`    | `warning-low-foreground`    | `hsl(28.42 72.52% 25.69%)`  | `hsl(48 96.64% 76.67%)`     |
| `--warning-medium`            | `warning-medium`            | `hsl(21.37 66.97% 78.63%)`  | `hsl(30.66 97.16% 72.35%)`  |
| `--warning-medium-background` | `warning-medium-background` | `hsl(34.62 100% 94.9%)`     | `hsl(30.66 97.16% 72.35%)`  |
| `--warning-medium-foreground` | `warning-medium-foreground` | `hsl(15.28 74.65% 27.84%)`  | `hsl(30.66 97.16% 72.35%)`  |

### 品牌 token 与色阶（15）

| Token                | 类名键             | Light                       | Dark                        |
| -------------------- | ------------------ | --------------------------- | --------------------------- |
| `--brand`            | `brand`            | `hsl(235.65 84.93% 71.37%)` | `hsl(234.88 93.18% 82.75%)` |
| `--brand-1`          | `brand-1`          | `hsl(240 100% 98.43%)`      | `hsl(237.45 47.47% 19.41%)` |
| `--brand-10`         | `brand-10`         | `hsl(236.5 52.82% 38.24%)`  | `hsl(235.79 93.44% 88.04%)` |
| `--brand-11`         | `brand-11`         | `hsl(236.57 48.61% 28.24%)` | `hsl(236.25 94.12% 93.33%)` |
| `--brand-12`         | `brand-12`         | `hsl(237.45 47.47% 19.41%)` | `hsl(240 100% 98.43%)`      |
| `--brand-2`          | `brand-2`          | `hsl(236.25 94.12% 93.33%)` | `hsl(236.57 48.61% 28.24%)` |
| `--brand-3`          | `brand-3`          | `hsl(235.79 93.44% 88.04%)` | `hsl(236.5 52.82% 38.24%)`  |
| `--brand-4`          | `brand-4`          | `hsl(234.88 93.18% 82.75%)` | `hsl(237.78 53.78% 49.22%)` |
| `--brand-5`          | `brand-5`          | `hsl(234.95 93.04% 77.45%)` | `hsl(237.22 70.89% 58.24%)` |
| `--brand-6`          | `brand-6`          | `hsl(235.65 84.93% 71.37%)` | `hsl(236.82 73.33% 64.71%)` |
| `--brand-7`          | `brand-7`          | `hsl(236.82 73.33% 64.71%)` | `hsl(235.65 84.93% 71.37%)` |
| `--brand-8`          | `brand-8`          | `hsl(237.22 70.89% 58.24%)` | `hsl(234.95 93.04% 77.45%)` |
| `--brand-9`          | `brand-9`          | `hsl(237.78 53.78% 49.22%)` | `hsl(234.88 93.18% 82.75%)` |
| `--brand-background` | `brand-background` | `hsl(240 100% 98.43%)`      | `hsl(236.5 52.82% 38.24%)`  |
| `--brand-foreground` | `brand-foreground` | `hsl(236.82 73.33% 64.71%)` | `hsl(235.79 93.44% 88.04%)` |

### 图表色（7）

| Token        | 类名键     | Light                       | Dark                        |
| ------------ | ---------- | --------------------------- | --------------------------- |
| `--chart-10` | `chart-10` | `hsl(46.15 11.11% 45.88%)`  | `hsl(46.15 11.11% 45.88%)`  |
| `--chart-11` | `chart-11` | `hsl(305.71 34.43% 88.04%)` | `hsl(305.71 34.43% 88.04%)` |
| `--chart-12` | `chart-12` | `hsl(301.11 30.68% 34.51%)` | `hsl(301.11 30.68% 34.51%)` |
| `--chart-6`  | `chart-6`  | `hsl(210 10.81% 56.47%)`    | `hsl(210 10.81% 56.47%)`    |
| `--chart-7`  | `chart-7`  | `hsl(81.6 65.79% 85.1%)`    | `hsl(81.6 65.79% 85.1%)`    |
| `--chart-8`  | `chart-8`  | `hsl(203.11 60% 44.12%)`    | `hsl(203.11 60% 44.12%)`    |
| `--chart-9`  | `chart-9`  | `hsl(209.3 81.13% 79.22%)`  | `hsl(209.3 81.13% 79.22%)`  |

## gradient token（6）

完整值 token，注册在 `backgroundImage`：**只能用 `bg-<key>`**，
`from-*` / `to-*` 类不会生成（见 `design-system/color.md`）。

| Token                      | 唯一可用类名                | Light                                                                                                                                                                                                                                                                 | Dark                                                                                                                                                                                                                                                                  |
| -------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--avatar-gradient-brand`  | `bg-avatar-gradient-brand`  | `radial-gradient(circle at 28% 24%, hsl(var(--brand-1)) 0%, transparent 46%), radial-gradient(circle at 72% 76%, hsl(var(--brand-6) / 0.72) 0%, transparent 44%), linear-gradient(145deg, hsl(var(--brand-2)) 0%, hsl(var(--brand-4)) 58%, hsl(var(--brand-7)) 100%)` | `radial-gradient(circle at 28% 24%, hsl(var(--brand-1)) 0%, transparent 46%), radial-gradient(circle at 72% 76%, hsl(var(--brand-6) / 0.72) 0%, transparent 44%), linear-gradient(145deg, hsl(var(--brand-2)) 0%, hsl(var(--brand-4)) 58%, hsl(var(--brand-7)) 100%)` |
| `--avatar-gradient-cyan`   | `bg-avatar-gradient-cyan`   | `radial-gradient(circle at 26% 22%, rgb(224 250 250) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(34 211 238 / 0.72) 0%, transparent 44%), linear-gradient(145deg, #edfafa 0%, #a5e7ee 58%, #67cbd8 100%)`                                            | `radial-gradient(circle at 26% 22%, rgb(224 250 250) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(34 211 238 / 0.72) 0%, transparent 44%), linear-gradient(145deg, #edfafa 0%, #a5e7ee 58%, #67cbd8 100%)`                                            |
| `--avatar-gradient-mint`   | `bg-avatar-gradient-mint`   | `radial-gradient(circle at 26% 22%, rgb(237 253 247) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(45 190 146 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #edfcf6 0%, #a9e8d1 58%, #55c7a2 100%)`                                             | `radial-gradient(circle at 26% 22%, rgb(237 253 247) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(45 190 146 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #edfcf6 0%, #a9e8d1 58%, #55c7a2 100%)`                                             |
| `--avatar-gradient-violet` | `bg-avatar-gradient-violet` | `radial-gradient(circle at 28% 22%, rgb(244 240 255) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(124 92 246 / 0.74) 0%, transparent 44%), linear-gradient(145deg, #f4f0ff 0%, #c8b9fb 58%, #8067ea 100%)`                                            | `radial-gradient(circle at 28% 22%, rgb(244 240 255) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(124 92 246 / 0.74) 0%, transparent 44%), linear-gradient(145deg, #f4f0ff 0%, #c8b9fb 58%, #8067ea 100%)`                                            |
| `--avatar-gradient-warm`   | `bg-avatar-gradient-warm`   | `radial-gradient(circle at 28% 22%, rgb(255 248 235) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(245 148 79 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #fff7eb 0%, #f7d4ad 58%, #eaa06b 100%)`                                             | `radial-gradient(circle at 28% 22%, rgb(255 248 235) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(245 148 79 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #fff7eb 0%, #f7d4ad 58%, #eaa06b 100%)`                                             |
| `--brand-gradient`         | `bg-brand-gradient`         | `linear-gradient(90deg, #416ef5, #707cff)`                                                                                                                                                                                                                            | `linear-gradient(90deg, #416ef5, #707cff)`                                                                                                                                                                                                                            |
