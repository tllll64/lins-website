# PRD: Playbook 页面重构

## 1. 项目概述

**项目名称**: Research 页面改版为 Playbook
**目标**: 将原有的 Research 页面重构为一个全面展示 AI 协作实践的 Playbook 页面
**优先级**: P0
**创建日期**: 2026-02-16
**负责人**: Lynn Tian
**预计工期**: 7-8 天

### 1.1 背景与动机

原有 Research 页面主要聚焦于学术研究成果展示（Publications 和 Demos），内容相对单一。随着 AI 协作实践的深入，需要一个更全面的平台来展示：
- AI 使用的哲学和方法论
- 实际工作流程和工具生态
- 实践产出和案例分析

因此将 Research 页面升级为 Playbook，整合学术研究、方法论和实践案例，打造一个完整的 AI 协作知识体系。

### 1.2 核心价值

- 📚 **知识沉淀**: 系统化记录 AI 协作的经验和方法
- 🔧 **实用指南**: 提供可复用的工作流和工具推荐
- 💡 **灵感启发**: 通过案例展示激发更多可能性
- 🌟 **个人品牌**: 展示专业能力和实践深度

### 1.3 目标用户

- 🎯 **主要用户**: 对 AI 协作感兴趣的设计师、产品经理
- 👥 **次要用户**: 技术从业者、学生、招聘方
- 🔍 **使用场景**: 学习参考、寻找灵感、了解能力

### 1.4 成功指标

**定量指标**:
- [ ] 页面加载时间 < 2s
- [ ] 页面停留时间 > 3min
- [ ] 跳出率 < 40%

**定性指标**:
- [ ] 内容结构清晰，易于理解
- [ ] 视觉呈现美观，符合品牌调性
- [ ] 交互流畅，无明显卡顿
- [ ] 所有功能正常工作

---

## 2. 页面结构设计

### 2.1 页面层级

```
Playbook 页面
├── Hero Section（页面标题区）
│   └── 标题 "Playbook" + 副标题 + 简介
│
├── Section 1: Academic Research（原 Research 内容）
│   ├── Teaser/Hero 区域（点阵背景）
│   ├── Publications 列表
│   └── Interactive Demos 视频展示
│
├── Section 2: AI Philosophy & Principles（AI 使用哲学与原则）
│   ├── 核心哲学卡片（2-3列）
│   └── 设计原则列表
│
├── Section 3: Workflow & Tools（工作流与工具）
│   ├── 工作流时间线/流程图
│   └── 工具网格展示
│
├── Section 4: Practice Documents（实践文档产出）
│   └── 文档卡片列表（支持飞书链接）
│
└── Section 5: Prototypes Gallery（交互原型展示）
    └── 瀑布流布局（VERSO 链接 + 录屏）
```

### 2.2 导航更新
- 路由从 `/research` 改为 `/playbook`
- 导航栏中的 "Research" 改为 "Playbook"
- 确保所有内部链接更新

---

## 3. 详细功能需求

### 3.1 Hero Section - 页面标题区

**设计要求**:
- 标题: "Playbook"
- 副标题: "AI 协作实践与方法论" 或 "From Philosophy to Practice"
- 简短介绍文字（2-3句话）
- 保持与 Home 页面一致的设计风格

**技术实现**:
- 使用现有的 hero 样式系统
- 响应式设计

---

### 3.2 Section 1: 原有 Research 内容

**现有内容分析**:
- **Teaser Section**: 80vh 高度的点阵背景区域（保留或优化）
- **Publications**: 学术论文发表列表（4篇论文，使用 PublicationCard 组件）
- **Interactive Demos**: 2x2 网格布局的视频演示区域

**迁移需求**:
- ✅ 保持 Publications 部分完整迁移
- ✅ 保持 Interactive Demos 部分完整迁移
- 🔄 Teaser Section 可以优化为更有意义的内容展示
- 📝 标题可改为 "Academic Research" 或保持 "Publications"

**技术细节**:
- 复用现有的 `PublicationCard` 组件
- 保留现有的 `publicationsData` 数组
- 保留视频 iframe 嵌入功能
- 确保所有 ACM DL 和 PDF 链接正常工作

---

### 3.3 Section 2: AI 使用哲学与原则

**内容组织**:

1. **核心哲学**（Philosophy Cards）
   - 使用卡片式布局（2-3列）
   - 每张卡片包含：
     - 图标/emoji
     - 标题（如："效率优先"、"人机协同"）
     - 描述文字（100-150字）

2. **设计原则**（Principles List）
   - 列表式展示
   - 每条原则包含：
     - 序号/标记
     - 原则名称
     - 详细说明

**内容示例（待填充）**:

核心哲学可能包括：
- 🎯 **效率至上**: AI 是工具，不是替代品，关键在于提升工作效率
- 🤝 **人机协同**: 发挥人类创造力和 AI 执行力的各自优势
- 🔄 **持续迭代**: 快速验证想法，不断优化工作流程
- 💡 **保持批判**: 不盲目依赖 AI 输出，始终保持独立思考

设计原则可能包括：
1. **明确目标，精准提示**
2. **结构化输入，结构化输出**
3. **分步骤处理复杂任务**
4. **验证结果，人工把关**
5. **记录流程，沉淀经验**

**视觉设计**:
- 背景色: 浅色系（colors.grey[98] 或白色）
- 卡片样式: 圆角、阴影、hover 效果
- 可选择左右布局或上下布局
- Section 标题样式与其他 Section 保持一致

---

### 3.4 Section 3: 工作流与工具

**内容结构**:

1. **工作流展示**（Workflow Timeline）
   - 时间线或流程图式布局
   - 展示典型的 AI 协作工作流
   - 每个步骤包含：
     - 步骤名称
     - 使用的工具
     - 关键操作
     - 可选：小图标或插图

   **工作流示例**（待具体化）:
   ```
   需求分析 → AI 头脑风暴 → 方案设计 → 快速原型 → 代码实现 → 测试优化 → 文档输出
      ↓           ↓           ↓          ↓          ↓          ↓          ↓
    Claude      Claude      Figma      v0.dev     Cursor     Claude     Notion
   ```

2. **工具清单**（Tools Grid）
   - 网格布局（3-4列）
   - 每个工具卡片包含：
     - 工具 Logo
     - 工具名称
     - 使用场景标签
     - 使用频率指示（如：⭐️⭐️⭐️⭐️⭐️）
     - 可选：点击展开详细说明

**工具分类与示例**（待补充具体内容）:

**AI 对话工具**:
- Claude Sonnet 4.5 ⭐️⭐️⭐️⭐️⭐️ - 代码生成、方案设计
- ChatGPT o1 ⭐️⭐️⭐️⭐️ - 复杂推理、数学问题
- Gemini ⭐️⭐️⭐️ - 多模态任务

**设计工具**:
- Figma ⭐️⭐️⭐️⭐️⭐️ - UI/UX 设计
- v0.dev ⭐️⭐️⭐️⭐️ - 快速原型
- Midjourney ⭐️⭐️⭐️ - 图像生成

**开发工具**:
- Cursor ⭐️⭐️⭐️⭐️⭐️ - AI 辅助编码
- GitHub Copilot ⭐️⭐️⭐️⭐️ - 代码补全
- Vercel ⭐️⭐️⭐️⭐️ - 快速部署

**生产力工具**:
- Notion ⭐️⭐️⭐️⭐️⭐️ - 知识管理
- 飞书 ⭐️⭐️⭐️⭐️ - 团队协作
- VERSO ⭐️⭐️⭐️⭐️ - 原型展示

**交互需求**:
- 工具卡片 hover 效果
- 可选：点击卡片展开详情模态框
- 可选：筛选功能（按分类）
- Logo 需要准备或使用 emoji 代替

---

### 3.5 Section 4: 实践文档产出

**内容类型**:
- 长文档
- 飞书文档链接
- 内部文档预览

**展示方式**（两种方案）:

**方案A: 列表式**
- 类似 Blog 列表
- 每项包含：
  - 文档标题
  - 简短摘要
  - 发布日期
  - 文档类型标签（飞书/内部文档/长文）
  - 阅读时长
  - 封面图（可选）

**方案B: 卡片式**
- 2列网格布局
- 卡片包含：
  - 封面图
  - 标题
  - 摘要（2-3行）
  - 外链图标（如果是飞书）
  - CTA 按钮："阅读文档"

**交互需求**:
- 点击跳转到对应文档
- 飞书文档：新标签页打开
- 内部文档：可能需要 PDF viewer 或 iframe
- Hover 效果

---

### 3.6 Section 5: 交互原型展示（瀑布流）

**布局要求**:
- Masonry 瀑布流布局
- 响应式：桌面 3-4列，平板 2列，移动 1列
- 自适应高度

**卡片内容**:
每个原型卡片包含：
- 封面预览图/缩略图
- 项目标题
- 简短描述（1-2行）
- 标签（技术栈、类型等）
- 交互方式指示器（"可交互" 或 "录屏展示"）

**交互方式（两种）**:

1. **可交互原型**:
   - 点击跳转到 VERSO 链接
   - 新标签页打开
   - 外链图标提示

2. **录屏展示**:
   - 点击打开视频播放模态框
   - 内嵌视频播放器
   - 支持全屏播放

**功能需求**:
- 懒加载（lazy loading）
- 图片优化
- 筛选功能（可选）：按类型、技术栈筛选
- 搜索功能（可选）

**视觉细节**:
- 卡片 hover 效果：轻微上浮 + 阴影加深
- 加载动画
- 空状态处理

---

## 4. 技术实现方案

### 4.1 技术栈
- React
- React Router（路由更新）
- 现有的 design system tokens
- 瀑布流库：考虑使用 `react-masonry-css` 或 `react-responsive-masonry`
- 视频播放：Arco Design Modal + HTML5 video

### 4.2 数据管理
```javascript
// 建议的数据结构
const playbookData = {
  philosophies: [
    { id, icon, title, description }
  ],
  principles: [
    { id, title, description }
  ],
  tools: [
    { id, name, logo, category, frequency, description }
  ],
  documents: [
    { id, title, summary, type, date, link, cover }
  ],
  prototypes: [
    { id, title, description, cover, tags, type: 'interactive' | 'video', link }
  ]
}
```

### 4.3 组件结构
```
Playbook/
├── index.jsx (主页面)
├── sections/
│   ├── PhilosophySection.jsx
│   ├── WorkflowSection.jsx
│   ├── DocumentsSection.jsx
│   └── PrototypesSection.jsx
├── components/
│   ├── PhilosophyCard.jsx
│   ├── ToolCard.jsx
│   ├── DocumentCard.jsx
│   ├── PrototypeCard.jsx
│   └── VideoModal.jsx
└── data/
    └── playbookData.js
```

---

## 5. 设计规范

### 5.1 布局
- 统一使用现有的 `layoutSpacing` 和 `width.container.xl`
- Section 之间间距：`layoutSpacing.section.xl`
- 卡片间距：`gridGap.xl` 或 `spacing.lg`

### 5.2 色彩
- 主背景：`colors.grey[98]`
- 卡片背景：`colors.white.solid`
- 强调色：使用现有的品牌色
- AI 相关内容可考虑使用蓝色系或紫色系

### 5.3 Typography
- 标题：`typography.heading1` / `typography.heading2`
- 正文：`typography.body`
- 小字：14px

### 5.4 交互
- Hover 动画：0.3s ease
- 卡片 hover：`transform: translateY(-4px)`
- 按钮 hover：opacity 或颜色变化

---

## 6. 内容准备清单

### 需要准备的内容：

**AI 哲学与原则**:
- [ ] 3-5 条核心哲学
- [ ] 5-8 条设计原则

**工作流与工具**:
- [ ] 工作流步骤梳理
- [ ] 常用工具列表（10-15个）
- [ ] 工具 Logo 图片

**实践文档**:
- [ ] 文档列表
- [ ] 飞书文档链接
- [ ] 封面图（如需要）

**交互原型**:
- [ ] 原型项目列表
- [ ] VERSO 链接
- [ ] 录屏视频文件
- [ ] 预览图/缩略图

---

## 7. 实施计划

### Phase 1: 准备与规划（Day 1）
- [x] 创建 PRD 文档
- [x] 分析现有 Research 页面
- [ ] 准备内容素材（哲学、原则、工具列表等）
- [ ] 设计初步的视觉稿（可选）
- [ ] 确定技术方案和依赖库

### Phase 2: 基础架构（Day 1-2）
- [ ] 创建 `/src/pages/Playbook.jsx` 文件
- [ ] 更新路由配置（`App.jsx` 或路由文件）
- [ ] 更新导航栏链接（`Navbar.jsx`）
- [ ] 实现 Hero Section
- [ ] 迁移原有 Research 内容到 Section 1
  - [ ] 复制 Publications 数据
  - [ ] 复制 Interactive Demos 数据
  - [ ] 确保 PublicationCard 组件正常工作

### Phase 3: 核心 Section 实现（Day 2-4）

**Section 2: AI Philosophy & Principles**
- [ ] 创建 `PhilosophyCard.jsx` 组件
- [ ] 创建 `PrinciplesList.jsx` 组件（可选）
- [ ] 准备内容数据（`playbookData.js`）
- [ ] 实现响应式布局
- [ ] 添加 hover 交互效果

**Section 3: Workflow & Tools**
- [ ] 创建 `WorkflowTimeline.jsx` 组件
- [ ] 创建 `ToolCard.jsx` 组件
- [ ] 准备工具列表数据
- [ ] 收集或准备工具 Logo
- [ ] 实现网格布局
- [ ] 添加交互效果

### Phase 4: 进阶功能（Day 4-6）

**Section 4: Practice Documents**
- [ ] 创建 `DocumentCard.jsx` 组件
- [ ] 准备文档列表数据
- [ ] 实现飞书链接跳转
- [ ] 可选：实现 PDF 预览功能
- [ ] 添加外链图标

**Section 5: Prototypes Gallery**
- [ ] 安装瀑布流库（`react-masonry-css` 或其他）
- [ ] 创建 `PrototypeCard.jsx` 组件
- [ ] 创建 `VideoModal.jsx` 组件
- [ ] 准备原型数据（链接、预览图等）
- [ ] 实现瀑布流布局
- [ ] 实现视频播放功能
- [ ] 添加懒加载优化

### Phase 5: 优化与测试（Day 6-7）
- [ ] 响应式测试（移动端、平板、桌面）
- [ ] 性能优化
  - [ ] 图片懒加载
  - [ ] 代码分割
  - [ ] 页面加载优化
- [ ] 交互细节打磨
  - [ ] 动画流畅度
  - [ ] Hover 效果
  - [ ] 加载状态
- [ ] 浏览器兼容性测试
- [ ] 修复 bug

### Phase 6: 内容填充与上线（Day 7-8）
- [ ] 填充所有真实内容
- [ ] 检查所有链接
- [ ] 最终视觉调整
- [ ] 代码审查
- [ ] 部署到生产环境
- [ ] 监控页面性能

---

## 8. 成功指标

- [ ] 页面加载时间 < 2s
- [ ] 所有交互流畅无卡顿
- [ ] 移动端适配完美
- [ ] 所有链接和跳转正常工作
- [ ] 视觉效果符合设计系统规范

---

## 9. 未来扩展

- 搜索功能
- 内容筛选
- 深色模式适配
- 动画效果增强
- 数据可视化（如工具使用统计）

---

## 10. 附录

### 10.1 当前状态

✅ **已完成**:
- PRD 文档创建
- 现有 Research 页面分析
- 技术方案确定

🚧 **进行中**:
- 内容素材准备

⏳ **待开始**:
- 代码实现

### 10.2 参考资源
- **现有页面**: `/src/pages/Research.jsx`
- **设计系统**: `/src/design-system/tokens.js`
- **组件库**: `/src/components/`
- **类似实现参考**:
  - Home 页面的 Section 布局
  - Blog 页面的卡片样式
  - Research 页面的 PublicationCard

### 10.3 关键问题与决策

**Q1**: 是否需要保留独立的 Research 页面？
- **决策**: 不保留，直接改名为 Playbook，所有学术内容作为 Section 1

**Q2**: 瀑布流使用哪个库？
- **选项**:
  - `react-masonry-css` - 轻量，CSS-only
  - `react-responsive-masonry` - 更灵活
- **决策**: 待定，实现时根据具体需求选择

**Q3**: 工具 Logo 如何处理？
- **选项**:
  - 使用真实 Logo（需要收集图片）
  - 使用 Emoji 代替
  - 使用图标库（Lucide React）
- **决策**: 优先使用 Emoji，后续可替换为真实 Logo

**Q4**: 视频托管方案？
- **现状**: 目前使用 YouTube iframe 嵌入
- **新增**: 支持本地视频文件或其他视频平台
- **决策**: 保持 iframe 方式，支持多平台

**Q5**: 文档预览如何实现？
- **选项**:
  - 飞书文档：直接跳转（新标签页）
  - 内部文档：PDF viewer（如已有 PDFViewer 组件）
  - Markdown：直接渲染
- **决策**: 混合方案，根据文档类型选择

### 10.4 依赖和资源需求

**npm 依赖**:
```json
{
  "react-masonry-css": "^1.0.16",  // 或 react-responsive-masonry
  // 其他可能需要的库
}
```

**资源文件**:
- [ ] 工具 Logo 图片（10-15个）
- [ ] 原型预览图/缩略图
- [ ] 录屏视频文件
- [ ] 文档封面图（可选）
- [ ] 哲学/原则配图（可选）

---

## 11. 立即行动 🚀

### 下一步要做的事情：

**优先级 P0（立即开始）**:
1. [ ] **内容准备**:
   - 整理 AI 使用哲学（3-5条）
   - 列出设计原则（5-8条）
   - 整理常用工具列表（10-15个）

2. [ ] **技术准备**:
   - 安装瀑布流库（如需要）
   - 确认组件结构设计

3. [ ] **开始编码**:
   - 创建 `/src/pages/Playbook.jsx`
   - 更新路由配置

**需要讨论的问题**:
- ❓ Hero Section 的具体文案是什么？
- ❓ 是否需要先做视觉设计稿？
- ❓ 哪些内容已经准备好可以直接使用？
- ❓ 是否有参考页面或设计示例？

**可以并行进行的工作**:
- 📝 内容创作（哲学、原则、文档等）
- 🎨 收集工具 Logo 和原型预览图
- 💻 代码实现（可以先用占位内容）

---

### 10.5 更新日志

**2026-02-16**:
- ✅ 初始版本创建
- ✅ 添加现有 Research 页面分析
- ✅ 细化各 Section 内容示例
- ✅ 详细化实施计划
- ✅ 添加关键决策点
- ✅ 添加项目背景和核心价值
- ✅ 添加立即行动指南

---

**准备好了吗？让我们开始重构 Playbook 页面！** 🎉

你希望先从哪个部分开始？
1. 准备内容素材
2. 开始代码实现（基础架构）
3. 讨论和细化设计方案
