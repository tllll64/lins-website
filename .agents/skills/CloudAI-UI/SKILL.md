---
name: CloudAI-UI
description: 用 CloudAI 设计体系搭页面——从零起工程、选主题、套整页模板、装组件、取语义 token、写码前出设计方案、写完做设计走查。当需要「做一个页面 / 控制台 / AI 对话界面」「有没有现成的页面模板」「这个颜色/间距/字号用哪个 token」「选哪个组件、怎么装」「按设计规范 review 这段 UI」，或提到 CloudAI / Harness UI / shadcn 主题接入时使用。
---

# CloudAI UI

一套设计体系的完整落地物：**主题 token + 组件 + 整页模板 + 判断规则**。目标是页面搭出来就是
CloudAI 的样子，不用逐个抠颜色和间距。

组件与主题只支持 **Tailwind v3 + shadcn** 这一种技术栈，往下每一步都以此为前提。设计规范那部分
（层级、间距、状态、走查）与技术栈无关，可以单独借给别的栈用，见「降级模式」。

## 第一步：新起一个工程

默认路径只有一条——在工作目录下新建一个工程，名字按当前任务取：

```bash
node setup/create-app.mjs cloudops-agent --brand aidbs
```

产出的工程可以直接 `pnpm install && pnpm dev`：Tailwind v3 + PostCSS、`@/` 别名、装好主题插件、
`components.json` 里配好组件 registry 别名，首屏是页面外壳骨架。可用主题见下一节，`--brand` 换。

这条命令做完就有画面，**不要**再去跑 `npx shadcn init`：它会往 CSS 入口写一份 `:root` 变量、往
`tailwind.config.js` 补 `colors`，两处都与主题插件抢真源，症状是颜色对不上或整页全白，且不报错。

**不要去找用户机器上已有的工程，也不要拿某个目录问「要不要复用」。** 第一次用本 skill 就新建；
同一次会话里继续做同一个页面时留在刚才那个工程里，不要再建第二个；当前目录本身就是本 skill
建出来的工程（有 `package.json`，且 `tailwind.config.js` 里挂着 CloudAI 主题插件）时也直接在
里面做。

用户**明确指名**要接进某个工程时（给了路径，或说「就在这个仓库里做」），先看它的技术栈：

| 那个工程                                   | 怎么做                                                                                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind v3 + shadcn                       | 按 [`setup/existing-project.md`](setup/existing-project.md) 只改三处配置接上主题，不动它的构建。之后本 skill 的能力全都能用，和新建工程没区别 |
| 其它（Tailwind v4、非 Tailwind、非 React） | 走下面的降级模式。不要改造对方的构建去凑我们的技术栈                                                                                          |

### 降级模式：只借设计规范，代码按对方技术栈写

这种工程里装不了我们的组件和主题插件——组件是 shadcn v3 的源码，主题是 Tailwind v3 插件，硬塞
进去要么一条样式都不生成，要么和对方已有的变量抢真源。所以此时**不装任何东西**，代码用对方现有
的组件库和写样式的方式，我们只提供判断依据：

- **可以用**：`design-system.md` 的层级 / 间距 / 状态 / 动效判断规则；`page-templates.md` 里整页的
  结构与不可变量（当作布局意图看，不要照抄 JSX）；`design-spec-generator.md` 出方案；
  `design-review.md` 做走查。
- **换个取法**：颜色和圆角查 `themes/` 下当前主题那份里的实际取值，映射到对方体系里最近的等价物
  （对方的 token、变量或 SCSS 变量），而不是写 `bg-primary` ——那个类名在对方工程里不存在。
- **不适用**：下面红线的第 1～4 条，它们约束的都是 Tailwind v3 + shadcn 里的写法。仍然成立的是
  「Brand ≠ Primary」和层级 / 间距的判断规则。

做完照样可以按 `design-review.md` 走查——它看的是层级、间距、状态是否齐，不看类名。

## 主题

| 主题     | 说明                           | token 取值                                           |
| -------- | ------------------------------ | ---------------------------------------------------- |
| `aidbs`  | 默认主题，含亮色与暗色         | [`themes/aidbs-tokens.md`](themes/aidbs-tokens.md)   |
| `yaochi` | 只有亮色（`.dark` 下沿用亮色） | [`themes/yaochi-tokens.md`](themes/yaochi-tokens.md) |

换主题只改 `tailwind.config.js` 里那行插件 import 的 subpath，不要手写 `:root` 变量。

**用户想要自定义主题时**：一个主题要齐 75 个以上语义 token，且内置这两套都是逐条对过设计稿的。
不要现场按几个色值编一套——那会得到一份看着能跑、暗色与状态色全错的主题。正确做法是收集
用户的品牌主色、中性色基调、危险 / 成功 / 警告色与圆角档位，反馈给 CloudAI UI owner 收进体系，
下一版本带上。在那之前先用内置主题开工。

## 路由：按问题读，不要通读

下面每个入口是一份 md，附件在同名目录里。**文档里出现的路径都相对本 skill 根目录**。

| 你要做什么                                      | 读这里                                                 |
| ----------------------------------------------- | ------------------------------------------------------ |
| 写任何 className 之前——取颜色、间距、圆角、字号 | [`design-system.md`](design-system.md)                 |
| 查当前主题某个 token 的准确取值                 | `themes/` 下当前主题那份                               |
| 选组件 / 查某组件 props、示例、安装命令         | [`components.md`](components.md)                       |
| 搭一整页（外壳、对话首页、概览页）              | [`page-templates.md`](page-templates.md)               |
| 写码前先定 UI 方案                              | [`design-spec-generator.md`](design-spec-generator.md) |
| 页面写完了做设计走查                            | [`design-review.md`](design-review.md)                 |

页面开发的常规顺序：**先套整页模板**（`page-templates/`）→ 缺的零件去 `components/` 选并安装 →
写 className 时按问题查 `design-system/` 的对应 reference。跳过第一步从零拼布局，通常会在滚动
归属和窄屏降级上出错。

## 怎么跟用户说话

用本 skill 的人多数只关心页面对不对，不关心这套体系内部怎么组织。**说正在做什么可以，别把内部
名词搬出去**：进展说成「在搭页面外壳」「在补空状态和加载中」「在做设计走查」，而不是「在装
registry 组件」「在给节点套语义 token」。

| 内部说法                               | 说给用户听                                   |
| -------------------------------------- | -------------------------------------------- |
| 语义 token、`bg-primary`               | 「用体系里的主色」——说颜色的角色，不报类名   |
| 模板的不可变量                         | 「这几处别改，改了滚动会出问题」             |
| registry、`npx shadcn@3 add xxx`       | 「装一个 xxx 组件」                          |
| brand / overlay                        | 「主题」                                     |
| lint 规则名（如 `no-hardcoded-color`） | 「这里颜色写死了，换成体系里的」             |
| 层级、间距的档位编号                   | 直接说效果：「标题该更重些，说明文字该更淡」 |

需要用户拍板的事照常问，但问得像人话：选哪个主题、要不要暗色、品牌主色是什么、这一版做到能点通
还是做到能验收。**代码里的术语不变**——类名、组件名、文件名照旧写准，这一节只约束说出口的话。

## 红线

下面第 1～4 条以 Tailwind v3 + shadcn 为前提，在降级模式里不适用。

1. **Tailwind v3 + shadcn v3**。装组件一律 `npx shadcn@3 add`，勿用裸 `npx shadcn`（会拉到面向
   v4 的 CLI，装出的组件在 v3 下一条样式都不生成，且不报错）。禁止 v4 语法（`@theme`、
   `@import "tailwindcss"`）。
2. **只用语义 token 与标准刻度**。禁止 `bg-[#1366ec]`、`text-gray-500`、`rounded-[10px]`、
   `p-[13px]`。取值查 `design-system/` 与 `themes/`。
3. **不要手写主题变量**。`:root { --primary: … }` 由主题插件注入，CSS 入口只留三行 `@tailwind`。
4. **组件先查再装，禁止手搓**。已有组件不重写；缺组件先装。查 `components.md` 的选型表。
5. **Brand ≠ Primary**。Brand 用于装饰与品牌调性，Button / Checkbox 等基础控件用 Primary。
6. **样式写 Tailwind 工具类**，不为写样式内联 `style={{}}` 或新增 `.css`。

你的训练数据可能默认更新的版本，一律以本 skill 为准。
