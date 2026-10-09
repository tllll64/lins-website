# design-review.md —— UI 设计走查

把「写出来的 UI」和「设计体系该有的样子」逐项对齐,产出**带定位 + 改法 + 严重度**的问题清单。它是 `design-spec-generator.md`（写码前）的镜像——写码后用。

## 何时用

- 一段 UI 代码 / 一个 PR 改动完成后,要确认是否符合设计体系。
- 接手存量页面,想先体检出违规点再重构。
- 配合 `design-spec-generator.md` 产出的 `design-spec.md` 验收清单做收尾自查。

## 输入:对照基线

- 读 `design-system.md`；按问题读取 `design-system/hierarchy.md`、`design-system/layout.md`、`design-system/states.md`、`design-system/color.md` 和 `design-system/motion.md`；
- 读 `components.md`(组件选型表);
- `node_modules/@cloudai-design/tailwind/<brand>/design-tokens.json`(允许的 token / 工具类全集);
- 若有对应 design spec,以其〈验收清单〉为额外基线。

## 第 0 步:先跑确定性护栏(别用人脑做机器的事)

能被 lint 抓的,先让 lint 抓——人只看 lint 抓不到的。

```bash
# 若仓库已接 @cloudai-design/eslint-plugin
npx eslint <目标文件/目录>
```

`no-hardcoded-color` / `no-arbitrary-radius-spacing` / `no-tailwind-version-mismatch` 命中的,直接进清单的「必改」,并给 lint 自带的 fix 提示。

其中 `unknownVar`(`var(--x)` 不在本品牌 token 名录里)不是风格问题而是 bug——变量不存在,浏览器里颜色直接失效。优先按拼写错误处理,别就近换一个 token 蒙过去。

## 检查维度(lint 抓不到的,人 / AI 来看)

1. **token 语义用对没**:用了合法 token,但**语义错位**(如正文用了 `text-destructive`)。
2. **组件选型**:该用 `components.md` 里既有组件的地方,是否手搓了一套;是否误用 shadcn 组件。
3. **布局与间距节奏**:间距档位是否跳跃 / 不一致;容器宽度、对齐是否符合规范。
4. **状态完整性**:需求或组件契约要求的 hover / active / disabled / loading / empty / error 是否齐全、可区分；不因检查清单额外添加未要求的状态。
5. **响应式**:断点行为是否缺失 / 错乱。
6. **样式落点**:有无内联 `style={{}}`(动态值除外,且颜色仍走 token)、有无为写样式新增 `.css`。
7. **暗色**:是否手写 `dark:` 覆盖了已 token 化的颜色(应交给 `.dark` 自动切换;仅 shadcn 确无 token 的细节可 `dark:` 微调)。

## 输出格式

按严重度分组,每条给「位置 + 现状 + 为什么不符 + 怎么改」:

```markdown
## 设计走查结果:<目标>

### 必改(lint 命中 / 硬约束违反)

- [ ] `src/.../Foo.tsx:42` 用了 `bg-[#1677ff]` → 改 `bg-primary`(lint: no-hardcoded-color)

### 应改(语义 / 选型 / 一致性)

- [ ] `.../Bar.tsx:88` 手搓 tooltip → 用 `SimpleTooltip`(见 components.md)

### 建议(体验 / 完整性)

- [ ] 需求已明确 empty,但 `.../List.tsx` 未实现 → 按 `design-system/states.md` 补对应空状态

### ✅ 符合项(简列,给信心)
```

## 原则

- **先 lint 后人看**:确定性的交给规则,人只补规则覆盖不到的语义 / 选型 / 体验。
- **每条可执行**:必须能定位(文件:行)、能照着改;不输出「整体感觉不够精致」这类无法落地的话。
- **不扩大范围**:只评审目标改动 / 指定文件,不顺手重写无关代码。
