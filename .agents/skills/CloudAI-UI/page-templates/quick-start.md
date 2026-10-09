# QuickStart 快速开始

**何时选它**：用户第一次配置一个东西，要**按顺序走 2～4 步**才算完——每一步做一个选择或填一组
参数，走完才有产物。页面主角是**当前这一步**，不是某份数据。

**试用场景**：新建 Agent 的数据源选择、首次接入数据库的连接向导、创建知识库、开通服务的开通流程、
迁移任务的配置向导。

**用户是在浏览一批已经存在的东西**（列表、明细、概览）时不是这一页，回 `SKILL.md` 的选型表重选。

**先抄 [AppShell](app-shell.md)**，本模板只是它 `SLOT:PageContent` 里的内容子树，不含顶栏与侧栏。

**抄 [`quick-start.tsx`](page-templates/quick-start/quick-start.tsx)，看
[`quick-start.reference.tsx`](page-templates/quick-start/quick-start.reference.tsx)。**
把骨架复制进你的页面，按还原件填 `SLOT:`。**不要 `import`，也不要整页抄还原件。**

下面这些是契约，照抄，不要凭手感重算。

## 结构

```txt
模板根（min-h-full flex-col）
├── Breadcrumb（sticky top-0，不透明底 + 底部渐变遮罩）
└── 正文（左右 64 / xl: 160，上 16 下 36，两块之间 28）
    ├── StepProgressBar        对整个内容区居中，在表单列外面
    │   └── StepIndicator ×N   序号胶囊 + 标签，中间用 ArrowRight 分隔
    └── 表单列（max-w 1000，居中，块间 24）
        ├── StepHeading                当前步骤标题 + 可选说明
        └── 选项 + 主操作（块间 20）
            ├── DataSourceOptionGroup  纵向，卡间 8，单选
            │   └── DataSourceOptionCard
            └── PrimaryAction          左对齐，跟随滚动
```

## 表单列封顶，宽屏由 padding 吃掉

```tsx
{
  /* 左右内边距是**下限**：窄档 64，xl:（1280）起 160 */
}
<div className="flex flex-col gap-7 px-16 pb-9 pt-4 xl:px-40">
  <div className="flex flex-wrap items-center justify-center gap-4">
    {/* 步骤条 */}
  </div>
  {/* 表单列自己还有 1000 的上限 */}
  <div className="mx-auto flex w-full max-w-[62.5rem] flex-col gap-6">
    {/* 表单 */}
  </div>
</div>;
```

**不要把表单列写成 `w-full`。** 内容区在 1920 档是 1640，减掉两侧 160 还有 1320——一行输入框横跨
1300px，眼睛从标签扫到控件要走完整个屏幕。封顶之后多出来的宽度全部变成 padding，页面重心不动。

四档实测：

| 档   | 内容区 | 左右 | 表单列           |
| ---- | ------ | ---- | ---------------- |
| 1024 | 1000   | 64   | 872              |
| 1280 | 1256   | 160  | 936              |
| 1440 | 1160   | 160  | 840              |
| 1920 | 1640   | 160  | **1000（封顶）** |

**步骤条在表单列外面。** 它对整个内容区居中，和表单列各自对齐自己的容器；塞进表单列里之后，将来
表单列一旦改成左对齐，步骤条就跟着偏过去了。

## 每个槽用什么

| 槽                                  | 用这个                                    | 备注                                                   |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| `Breadcrumb`                        | shadcn `Breadcrumb`                       | `npx shadcn@3 add breadcrumb`；末级用 `BreadcrumbPage` |
| `StepProgressBar` / `StepIndicator` | 就地画                                    | 仓里没有步骤条组件，照骨架抄，别去装第三方 stepper     |
| `DataSourceOptionGroup`             | shadcn `RadioGroup`                       | `npx shadcn@3 add radio-group`                         |
| `DataSourceOptionCard`              | `<label>` + `sr-only` 的 `RadioGroupItem` | 选中态只有描边 + 浅底，见下                            |
| 卡片上的 pill                       | `StatusBadge`                             | `iconVariant="none"`；别手搓三 token pill              |
| `PrimaryAction`                     | `Button`                                  | 默认 size（h-9）；loading 时禁用并换文案               |
| 选项区 / 提交的报错                 | `MessageBar`                              | `status="warning-high"`，重试用 `MessageBarAction`     |

**选项卡是真的单选，只是不画圆点。**（裁 10）整张卡是 `<label>`，真正的 radio 是里面 `sr-only` 的
`RadioGroupItem`：

```tsx
<RadioGroup
  value={value}
  onValueChange={setValue}
  aria-label="数据源"
  className="gap-2"
>
  {options.map((option) => (
    <label
      key={option.value}
      className={cn(
        'bg-card flex cursor-pointer flex-col gap-4 rounded-2xl border p-4',
        'focus-within:ring-brand focus-within:ring-2 focus-within:ring-offset-2',
        value === option.value
          ? 'border-brand-7 bg-brand-1'
          : 'border-border hover:border-brand-3',
      )}
    >
      <RadioGroupItem value={option.value} className="sr-only" />
      {/* 图标 + 标题 / 描述 / pill */}
    </label>
  ))}
</RadioGroup>
```

**`focus-within` 那行不能省。** 焦点落在隐藏的 radio 上，没有它键盘用户按方向键能选中，却看不出
选到了哪张卡。**也不要改成一排 `<div onClick>`**：那样方向键、读屏与表单提交全丢了，换来的只是少
写一个 `sr-only`。

## 不可变量

| 量                     | 值                                                  |
| ---------------------- | --------------------------------------------------- |
| 内容左右内边距         | 64（`px-16`）→ `xl:` 起 160（`px-40`），型 ③        |
| 表单列                 | `max-w-[62.5rem]`（1000）+ `mx-auto`                |
| 面包屑行               | 上 20（`pt-5`），`sticky top-0`，底部 16 的渐变遮罩 |
| 正文上下               | 上 16（`pt-4`）、下 36（`pb-9`）                    |
| 步骤条 ↔ 表单列        | 28（`gap-7`）                                       |
| 步骤条内部             | 步与步 16（`gap-4`），序号 ↔ 标签 8（`gap-2`）      |
| 序号胶囊               | 高 20，圆角 12，左右 8；文字 12 medium              |
| `StepHeading` 内部     | 4（`gap-1`）：标题 24/32 + 说明 16/24               |
| `StepHeading` ↔ 选项区 | 24（`gap-6`）                                       |
| 选项区 ↔ 主操作        | 20（`gap-5`）                                       |
| 选项卡间距             | 8（`gap-2`）                                        |
| 选项卡                 | 内边距 16、块间 16、圆角 16、1px 描边               |
| 主操作                 | 高 36，圆角 8；**左对齐**，齐表单列左边缘           |

**这张表里没有任何高度。** 卡片多高由描述几行决定，页面多高由卡片数决定，底部允许留白。

## 插槽

| 插槽                    | 允许放                                     | 禁止放                       | 空态                 |
| ----------------------- | ------------------------------------------ | ---------------------------- | -------------------- |
| `Breadcrumb`            | 多级面包屑导航，单行                       | 搜索框、操作按钮             | 顶层页面时整行不渲染 |
| `StepProgressBar`       | 2～4 个 `StepIndicator`，横向居中          | 纵向排列、超过 4 步          | 不允许为空           |
| `StepIndicator`         | 步骤序号 + 步骤标签                        | 多行描述、用图标替换序号     | 不允许为空           |
| `StepHeading`           | 当前步骤标题 + 可选一行说明                | 多段正文、操作按钮           | 说明可省，标题不可省 |
| `DataSourceOptionGroup` | 2～4 张 `DataSourceOptionCard`，纵向，单选 | 与本步选择无关的操作         | 「暂无可用数据源」   |
| `DataSourceOptionCard`  | 选项图标 + 标题 + 可选 pill + 描述         | 长列表、多个主操作按钮、大图 | 不允许为空           |
| `PrimaryAction`         | 单行按钮文案 + 可选 loading                | 副标题、多个图标、二级操作   | 不允许为空           |

**槽名里的 `DataSource` 是稿上的例子，不是限定。** 这两个槽就是「本步要选的那一组东西」——选模型、
选模板、选规格都用它，字段照填。

**切换步骤是整页内容替换**：`StepHeading` 与选项区一起换掉，不是弹窗，也不是新路由。步骤条上只改
状态，不重挂。

## 状态

| 状态         | 表现                                                         |
| ------------ | ------------------------------------------------------------ |
| 选项区加载   | 三张卡骨架占位，**步骤条与 `StepHeading` 照常显示**          |
| 选项区为空   | 选项区内显示「暂无可用数据源」                               |
| 选项区错误   | 选项区**内联报错 + 重试**，不换整页错误页                    |
| 未选任何项   | 主操作保持 disabled                                          |
| 提交失败     | 报错在主操作**上方**内联，**不跳步**；出错那一步描边转告警色 |
| 选项卡 hover | 描边转品牌色                                                 |

**报错配色一律走语义 token**（`warning-high` 那组），不自己配红。**出错的那一步在步骤条上用告警色
描边**——只把报错写在按钮上方的话，多步向导里用户看不出是哪一步没过。

**四个状态都发生在选项区内部**，步骤条与页头不动。整页级的骨架或错误页会把用户已经走过的步骤一起
抹掉，他连自己在第几步都不知道了。

## 响应式

| 区域       | Compact ≤1280     | Standard 1440 | Wide ≥1920                |
| ---------- | ----------------- | ------------- | ------------------------- |
| 内容区     | 全宽 − 24         | 1160          | 跟随外壳撑满，不限宽      |
| 左右内边距 | 64（`xl:` 以下）  | 160           | 160，多出来的宽度加在两侧 |
| 表单列     | 自适应，封顶 1000 | 840           | **1000（封顶）**          |
| 步骤条     | 恒横向，间距压缩  | 恒横向        | 恒横向                    |

**步骤条不改纵向**，步数少也不改；窄到放不下时先换行，再压缩间距。**侧栏自动收起阈值 1440**，
由外壳负责，本模板不管。

## 滚动归属

| 层                | 行为                                                   |
| ----------------- | ------------------------------------------------------ |
| 整页              | 不滚                                                   |
| `ContentArea`     | **唯一的主滚动容器**（在 `AppShell` 里，本模板不再挂） |
| `Breadcrumb`      | `sticky top-0`，不跟随滚动                             |
| `StepProgressBar` | 跟着 `ContentArea` 滚，**不 sticky**                   |
| 选项区            | 跟着 `ContentArea` 滚，**不纵向内滚**                  |
| `PrimaryAction`   | 跟着内容一起滚，**不吸底**                             |

**主操作不吸底。**（裁 9）窄屏上吸底的按钮会盖住最后一张卡，而这一页的内容本来就不长，滚到底再点
是自然的动作。

**步骤条不 sticky。** 这一页已经有一条常驻的面包屑，再钉一条会吃掉首屏近 100px。

**内容里不许再开纵向滚动容器。** 两条滚动条时，用户的滚轮落在哪里取决于指针位置。

## 增强项

- **步骤条固定 2～4 步、横向**，步数少也不改纵向；超过 4 步说明这不是向导，拆成多个页面。
- **表单列宽有上限**，宽屏不跟着拉宽，多出来的空间由 padding 吃掉。
- **步骤条对整个内容区居中**，不是对表单列居中。
- **选项卡单选，选中态用描边 + 浅底**，不做成 checkbox 外观，也不画 radio 圆点。
- **切换步骤是整页内容替换**，不是弹窗也不是新路由。
- 稿上的 `Step 1 Title`、示例数据库描述都是占位内容，换掉；间距、圆角与步骤条排布留下。
