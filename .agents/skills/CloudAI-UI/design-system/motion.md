# Motion

**Covers:** 判断界面是否需要动效、动效表达什么，以及应复用哪个组件行为或 CloudAI 动效 class。

**Use when:** 设计操作反馈、展开收起、进入退出、页面切换、运行过程、hover 预览、拖拽或 reduced motion 时。

**Does not cover:** 状态内容和反馈查 `states.md`；duration、曲线、keyframe 与复合 class 由运行时维护；拖拽、惯性、测量和组件专属动画由组件负责。

## 问题索引

- [判断动效是否必要](#判断动效是否必要)
- [明确何时触发、什么变化、最终状态](#明确何时触发什么变化最终状态)
- [控制频率和注意力](#控制频率和注意力)
- [选择已有动效能力](#选择已有动效能力)
- [按压反馈](#按压反馈)
- [元素进入、退出和切换](#元素进入退出和切换)
- [Hover 反馈](#hover-反馈)
- [连续输入和中断](#连续输入和中断)
- [Reduced motion](#reduced-motion)
- [实现并验证动效](#实现并验证动效)

## 判断动效是否必要

### Don't

- 不增加或延长动效来掩盖加载、状态、布局或性能问题。
- 不为普通页面添加装饰性入场、过程动画或抖动。

### 设计原则

动效至少表达一项真实信息：操作已接收、因果或空间关系、变化前后是同一对象、过程仍在进行，或刚出现且需要处理的变化。删除动效不影响理解或操作时，不需要添加。

## 明确何时触发、什么变化、最终状态

### Don't

- 不用动画名称代替状态定义。
- 不把拖拽、滑杆等连续输入强拆成多个状态节点。

### 设计原则

选择动效前先确认：

- 哪次操作或界面变化触发动效；
- 哪个 UI 元素从什么状态变到什么状态；
- 哪些内容必须保持稳定；
- 反向、取消或快速重复时停在哪里；
- reduced motion 下如何保留同一信息。

前后界面状态的内容和载体查 `states.md`；hover、pressed、open / closed 查组件状态；拖拽和滑杆查组件的连续输入契约。

## 控制频率和注意力

### Do

- 循环动画在完成、失败、暂停或离开可视区后停止。
- 引导动效只在需求指定的演示节点播放，不循环。
- 高频 Tab 切换、列表选择、快捷键和方向键导航直接更新内容。
- 自动播放或循环的内容必须提供可见的暂停控件；仅随任务状态短暂出现并自动停止的反馈除外。

### Don't

- 不让高频切换的内容每次重新入场。
- 不逐字、逐行或逐节点机械 stagger，也不让 stagger 阻塞操作。
- 普通展开和局部切换不做多段入场。
- 首屏默认内容不播放入场。
- 同页不让多个无关循环争抢注意力。

### 设计原则

高频变化的反馈应即时。低频且改变任务阶段或页面层级的变化，才可能使用更明显的位移。只有先后顺序有助于理解时，才让低频局部内容按语义组依次进入。

## 选择已有动效能力

### Do

按以下顺序实现：

1. 组件已有动效契约时直接沿用。
2. 否则按实际变化和目的选择公开能力。
3. 没有对应能力时记录状态变化、视觉变化、目的和 reduced-motion 方案。

核对 class 时，先从 Tailwind 配置定位当前 CloudAI brand 插件，再到同包 `v3/_runtime.js` 按完整 class 名搜索。只搜 brand `index.js` 会漏掉公共能力。

<!-- MOTION_CAPABILITIES:start -->

| 适用场景                   | 能力                   | 使用边界                                |
| -------------------------- | ---------------------- | --------------------------------------- |
| 列表项或链路节点从下方进入 | `animate-enter-up`     | 不用于整页首屏                          |
| 行内 pill 出现             | `animate-enter-pop`    | 不替代普通内容入场                      |
| 图标替换                   | `animate-enter-scale`  | 控件外框和文字保持稳定                  |
| 独立的运行状态提示         | `animate-breathe`      | 不用于已有位移或缩放的元素              |
| 文字等待或生成扫光         | `shimmer-text`         | 只作用于文字                            |
| 图标与文字整体扫光         | `shimmer-mask`         | 只用于已有底层和遮罩层的组件            |
| 紧凑控件属性过渡           | `transition-control`   | 组件先定义前后状态                      |
| pill 的透明度与位移过渡    | `transition-pill`      | 不会自行产生入场                        |
| 高频 hover 预览            | `motion-hover-preview` | 组件先提供 open / closed 状态和方向变量 |

<!-- MOTION_CAPABILITIES:end -->

直接使用四个 `animate-*` 时，由调用方添加 reduced motion：

```tsx
<div className="animate-enter-up motion-reduce:animate-none">...</div>
```

五个复合 class 已处理内部 animation 和 transition；调用方额外添加的位移或缩放仍需自己的 reduced-motion 降级。普通 Tailwind transition 仍由调用方添加 `motion-reduce:transition-none`。

### Don't

- 不因名称或观感相近而互换 class。
- 不把只提供 transition 的 class 当成完整动画。
- 不使用公开表之外的运行时内部 class。
- 不在业务代码重写 duration、easing、keyframe 或运行时 CSS。

### 设计原则

按触发条件、UI 变化、表达目的和使用频率选择能力，不按动画名称选择。

## 按压反馈

### Do

- 已有组件提供按压反馈时直接沿用，不重复添加。
- 长按确认可以让确认过程较慢；松开、取消和复位立即响应。具体时长由组件负责。
- 自定义紧凑按钮在鼠标或触控板按下时立即缩小，松开后恢复：

```tsx
<button
  type="button"
  className="transition-control pointer-fine:active:scale-[0.97] motion-reduce:active:scale-100"
>
  ...
</button>
```

### Don't

- 按压反馈不等待 `click` 或操作结果。
- 不把普通按压缩放用于拖拽、长按确认或连续输入；沿用组件手势契约。
- 组件缺少统一的 pressed 动效时，记录组件能力缺口，不在每个页面重复拼接。

### 设计原则

按压反馈说明“操作已收到”，loading、success 和 error 说明操作结果。两者不能互相替代。

## 元素进入、退出和切换

### Do

- Popover、Dropdown 已有 transform-origin 契约时直接沿用；没有时记录组件能力缺口。居中的 Dialog 保持居中。
- 有明确方向的浮层或面板沿进入路径退出；组件进退方向不一致时记录能力缺口。
- 展开时保持入口和原有内容稳定；关闭应立即响应，不分段或延迟。
- 页面切换只让变化区域参与动效；共享导航与固定外框保持稳定。

### Don't

- 内容替换已经清楚表达结果时，不再叠加庆祝或抖动。
- 不让同一对象从一侧进入、从另一侧退出。
- 没有明确空间方向或层级时，不强加方向性位移。
- 不从 `scale(0)` 入场；图标替换使用 `animate-enter-scale`，其他对象沿用组件契约。
- 不缩放包含正文、表格或大量内容的容器；`scale` 会连同全部子元素一起缩放。
- 普通 Menu、Dialog 和内容切换不添加 bounce 或 overshoot；拖拽和甩动手势沿用组件契约。
- 主题切换不让颜色、边界和阴影逐元素播放。

### 设计原则

动效要说明什么变了、从哪里来、回哪里去。没有真实方向时直接切换或轻量淡入淡出；弹性只来自拖拽或甩动产生的动量。

## Hover 反馈

### Do

- 鼠标和触控板的 hover 使用 `pointer-fine:hover:*`，按压使用 `pointer-fine:active:*`。
- 位移类 hover 保持可交互区域不动，只移动内部视觉层。
- 键盘和触屏提供等价入口与反馈。

### Don't

- 不让 hover 动效承担唯一反馈。

## 连续输入和中断

### Do

- 拖拽、滑杆和可拖动面板在输入过程中持续跟随。
- 动画允许从当前状态反向播放，或立即到达正确状态。
- 自定义 open / closed 等可反向状态时，用 transition 从当前状态连接到新状态；`animate-enter-*` 只用于不需要中途反向的一次性入场。
- 退出中的内容不再接收操作。

### Don't

- 不只在松手后播放一次结果动画。
- 不让动画阻塞其他可用控件。
- 业务代码不自行实现惯性、spring 或 snap。

### 设计原则

中断后的结果必须符合当前状态，而不是动画原计划的终点。

## Reduced motion

### Do

- 在 reduced motion 下移除大幅位移、缩放、视差和循环；直接显示终态。
- 停止循环后，静态图标、文字或进度仍必须可见。

### Don't

- 不把状态反馈与运动一起删除。

### 设计原则

终态已足够清楚时直接切换；仍需轻微过渡时，只保留 opacity 或 color。

## 实现并验证动效

### Do

- 优先用 `transform` 和 `opacity` 实现动画；为布局尺寸添加动画前，先确认组件已有可靠实现。
- 业务页面自行实现动效时，只声明需要过渡的具体属性。
- 仅 opacity 变化时使用 `transition-opacity`；同时改变 opacity 和 transform 时使用 `transition-[opacity,transform]`。

Reduced motion 下可直接显示终态时：

```tsx
<div className="transition-[opacity,transform] motion-reduce:transition-none">
  ...
</div>
```

- 实际触发 hover、focus、pressed、open / closed、loading 和 empty 等相关路径。
- 覆盖快速重复、反向和中途取消，用慢放或逐帧检查错位、跳变和闪现。
- 验证 reduced motion、触屏和低性能设备下仍可完成任务。
- 核对引用的 class 确实存在。

### Don't

- 业务页面不使用 `transition-all`；组件内部沿用组件契约。

```tsx
<div className="transition-all">...</div>
```

- 不长期为大量元素设置 `will-change`。
- 不在业务组件复制运行时 CSS。
