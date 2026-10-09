<!-- 由 tools/emitters/skill-tokens.ts 从 brands/yaochi/tokens/figma/yaochi-Light.tokens.json 生成，勿手改 -->

# 完整语义 token 参考（yaochi）

取值来自 Figma Mode `Yaochi Agent`，共 80 个 token。
**这是本品牌的实际取值**，不是示例；写死 hex 之前先在这里找语义 token。

color token 可用于任意颜色工具类（`{bg,text,border,ring,fill,stroke,…}-<类名键>`），
**本品牌只有亮色一套取值**：`.dark` 下沿用同一组变量，写 `dark:` 不会有任何区别。颜色用法见 `design-system/color.md`。

## 圆角刻度

| 类名         | 值                          |
| ------------ | --------------------------- |
| `rounded-lg` | `var(--radius)`             |
| `rounded-md` | `calc(var(--radius) - 2px)` |
| `rounded-sm` | `calc(var(--radius) - 4px)` |

## color token（74）

### shadcn 标准 token（31）

| Token                          | 类名键                       | Light                       |
| ------------------------------ | ---------------------------- | --------------------------- |
| `--accent`                     | `accent`                     | `hsl(240 9.09% 97.84%)`     |
| `--accent-foreground`          | `accent-foreground`          | `hsl(240 4.55% 8.63%)`      |
| `--background`                 | `background`                 | `hsl(0 0% 100%)`            |
| `--border`                     | `border`                     | `hsl(220 5.66% 89.61%)`     |
| `--card`                       | `card`                       | `hsl(0 0% 100%)`            |
| `--card-foreground`            | `card-foreground`            | `hsl(240 4.76% 4.12%)`      |
| `--chart-1`                    | `chart-1`                    | `hsl(246.39 93.37% 64.51%)` |
| `--chart-2`                    | `chart-2`                    | `hsl(177.1 54.87% 44.31%)`  |
| `--chart-3`                    | `chart-3`                    | `hsl(297.19 55.17% 45.49%)` |
| `--chart-4`                    | `chart-4`                    | `hsl(217.4 92.77% 67.45%)`  |
| `--chart-5`                    | `chart-5`                    | `hsl(37.34 84.62% 33.14%)`  |
| `--destructive`                | `destructive`                | `hsl(0 72.22% 50.59%)`      |
| `--foreground`                 | `foreground`                 | `hsl(240 4.76% 4.12%)`      |
| `--input`                      | `input`                      | `hsl(220 5.66% 89.61%)`     |
| `--muted`                      | `muted`                      | `hsl(0 0% 96.08%)`          |
| `--muted-foreground`           | `muted-foreground`           | `hsl(240 1.1% 64.31%)`      |
| `--popover`                    | `popover`                    | `hsl(0 0% 100%)`            |
| `--popover-foreground`         | `popover-foreground`         | `hsl(240 4.76% 4.12%)`      |
| `--primary`                    | `primary`                    | `hsl(217.05 85.1% 50%)`     |
| `--primary-foreground`         | `primary-foreground`         | `hsl(0 0% 100%)`            |
| `--ring`                       | `ring`                       | `hsl(240 1.1% 64.31%)`      |
| `--secondary`                  | `secondary`                  | `hsl(240 9.09% 95.69%)`     |
| `--secondary-foreground`       | `secondary-foreground`       | `hsl(0 0% 36.47%)`          |
| `--sidebar`                    | `sidebar`                    | `hsl(0 0% 98.04%)`          |
| `--sidebar-accent`             | `sidebar-accent`             | `hsl(240 9.09% 95.69%)`     |
| `--sidebar-accent-foreground`  | `sidebar-accent-foreground`  | `hsl(240 4.55% 8.63%)`      |
| `--sidebar-border`             | `sidebar-border`             | `hsl(220 5.66% 89.61%)`     |
| `--sidebar-foreground`         | `sidebar-foreground`         | `hsl(240 4.76% 4.12%)`      |
| `--sidebar-primary`            | `sidebar-primary`            | `hsl(240 4.55% 8.63%)`      |
| `--sidebar-primary-foreground` | `sidebar-primary-foreground` | `hsl(0 0% 98.04%)`          |
| `--sidebar-ring`               | `sidebar-ring`               | `hsl(240 1.1% 64.31%)`      |

### 扩展语义 token（状态 / 分级告警 / 侧栏之外的自定义语义）（21）

| Token                         | 类名键                      | Light                       |
| ----------------------------- | --------------------------- | --------------------------- |
| `--brand-accent-background`   | `brand-accent-background`   | `hsl(230 60% 98.04%)`       |
| `--brand-accent-foreground`   | `brand-accent-foreground`   | `hsl(223.76 100% 26.08%)`   |
| `--destructive-foreground`    | `destructive-foreground`    | `hsl(3.16 100% 96.27%)`     |
| `--normal`                    | `normal`                    | `hsl(225.07 100% 59.8%)`    |
| `--normal-background`         | `normal-background`         | `hsl(218.57 70% 96.08%)`    |
| `--normal-foreground`         | `normal-foreground`         | `hsl(225.07 100% 59.8%)`    |
| `--success`                   | `success`                   | `hsl(150.65 95.86% 28.43%)` |
| `--success-background`        | `success-background`        | `hsl(127.5 61.54% 94.9%)`   |
| `--success-foreground`        | `success-foreground`        | `hsl(150.65 95.86% 28.43%)` |
| `--unknown`                   | `unknown`                   | `hsl(0 0% 50.2%)`           |
| `--unknown-background`        | `unknown-background`        | `hsl(0 0% 96.47%)`          |
| `--unknown-foreground`        | `unknown-foreground`        | `hsl(0 0% 50.2%)`           |
| `--warning-high`              | `warning-high`              | `hsl(356.73 90.18% 43.92%)` |
| `--warning-high-background`   | `warning-high-background`   | `hsl(3.75 80% 96.08%)`      |
| `--warning-high-foreground`   | `warning-high-foreground`   | `hsl(356.73 90.18% 43.92%)` |
| `--warning-low`               | `warning-low`               | `hsl(50.13 98.25% 44.9%)`   |
| `--warning-low-background`    | `warning-low-background`    | `hsl(46.67 90% 96.08%)`     |
| `--warning-low-foreground`    | `warning-low-foreground`    | `hsl(49.13 100% 31.37%)`    |
| `--warning-medium`            | `warning-medium`            | `hsl(22.39 92.07% 55.49%)`  |
| `--warning-medium-background` | `warning-medium-background` | `hsl(18.95 90.48% 95.88%)`  |
| `--warning-medium-foreground` | `warning-medium-foreground` | `hsl(24.61 100% 42.55%)`    |

### 品牌 token 与色阶（15）

| Token                | 类名键             | Light                       |
| -------------------- | ------------------ | --------------------------- |
| `--brand`            | `brand`            | `hsl(217.05 85.1% 50%)`     |
| `--brand-1`          | `brand-1`          | `hsl(230 60% 98.04%)`       |
| `--brand-10`         | `brand-10`         | `hsl(221.79 100% 32.94%)`   |
| `--brand-11`         | `brand-11`         | `hsl(223.76 100% 26.08%)`   |
| `--brand-12`         | `brand-12`         | `hsl(228.39 92.08% 19.8%)`  |
| `--brand-2`          | `brand-2`          | `hsl(231.72 74.36% 92.35%)` |
| `--brand-3`          | `brand-3`          | `hsl(230 90.91% 87.06%)`    |
| `--brand-4`          | `brand-4`          | `hsl(231.63 93.48% 81.96%)` |
| `--brand-5`          | `brand-5`          | `hsl(230.81 90.24% 75.88%)` |
| `--brand-6`          | `brand-6`          | `hsl(230.45 84.62% 69.41%)` |
| `--brand-7`          | `brand-7`          | `hsl(229.46 76.29% 61.96%)` |
| `--brand-8`          | `brand-8`          | `hsl(227.7 67.93% 53.53%)`  |
| `--brand-9`          | `brand-9`          | `hsl(225.09 75.78% 43.73%)` |
| `--brand-background` | `brand-background` | `hsl(216 92.59% 94.71%)`    |
| `--brand-foreground` | `brand-foreground` | `hsl(229.46 76.29% 61.96%)` |

### 图表色（7）

| Token        | 类名键     | Light                       |
| ------------ | ---------- | --------------------------- |
| `--chart-10` | `chart-10` | `hsl(36.87 76.17% 46.08%)`  |
| `--chart-11` | `chart-11` | `hsl(217.41 68.55% 51.37%)` |
| `--chart-12` | `chart-12` | `hsl(84 56.56% 43.33%)`     |
| `--chart-6`  | `chart-6`  | `hsl(341.17 80.12% 66.47%)` |
| `--chart-7`  | `chart-7`  | `hsl(177.64 91.37% 27.25%)` |
| `--chart-8`  | `chart-8`  | `hsl(261.82 100% 74.12%)`   |
| `--chart-9`  | `chart-9`  | `hsl(82.86 67.74% 30.39%)`  |

## gradient token（6）

完整值 token，注册在 `backgroundImage`：**只能用 `bg-<key>`**，
`from-*` / `to-*` 类不会生成（见 `design-system/color.md`）。

| Token                      | 唯一可用类名                | Light                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--avatar-gradient-brand`  | `bg-avatar-gradient-brand`  | `radial-gradient(circle at 28% 24%, hsl(var(--brand-1)) 0%, transparent 46%), radial-gradient(circle at 72% 76%, hsl(var(--brand-6) / 0.72) 0%, transparent 44%), linear-gradient(145deg, hsl(var(--brand-2)) 0%, hsl(var(--brand-4)) 58%, hsl(var(--brand-7)) 100%)` |
| `--avatar-gradient-cyan`   | `bg-avatar-gradient-cyan`   | `radial-gradient(circle at 26% 22%, rgb(224 250 250) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(34 211 238 / 0.72) 0%, transparent 44%), linear-gradient(145deg, #edfafa 0%, #a5e7ee 58%, #67cbd8 100%)`                                            |
| `--avatar-gradient-mint`   | `bg-avatar-gradient-mint`   | `radial-gradient(circle at 26% 22%, rgb(237 253 247) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(45 190 146 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #edfcf6 0%, #a9e8d1 58%, #55c7a2 100%)`                                             |
| `--avatar-gradient-violet` | `bg-avatar-gradient-violet` | `radial-gradient(circle at 28% 22%, rgb(244 240 255) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(124 92 246 / 0.74) 0%, transparent 44%), linear-gradient(145deg, #f4f0ff 0%, #c8b9fb 58%, #8067ea 100%)`                                            |
| `--avatar-gradient-warm`   | `bg-avatar-gradient-warm`   | `radial-gradient(circle at 28% 22%, rgb(255 248 235) 0%, transparent 48%), radial-gradient(circle at 72% 76%, rgb(245 148 79 / 0.7) 0%, transparent 44%), linear-gradient(145deg, #fff7eb 0%, #f7d4ad 58%, #eaa06b 100%)`                                             |
| `--brand-gradient`         | `bg-brand-gradient`         | `linear-gradient(90deg, #1366EC 0%, #7366FF 100%)`                                                                                                                                                                                                                    |
