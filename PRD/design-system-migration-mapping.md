# 设计系统迁移映射文档

## 概述
本文档详细说明如何将现有 Home 和 About 页面的 Tailwind CSS 样式系统迁移到基于 Figma 的新设计系统。

---

## 一、颜色系统映射

### 1.1 当前颜色 → 新设计系统颜色

| 当前颜色变量 | 当前值 | 新设计系统映射 | 新值 | 用途 |
|------------|-------|--------------|------|------|
| `bg-ds-cararra` | `#F6F6F2` | `colors.grey[98]` | `#fafafa` | 页面背景 |
| `text-ds-cod` | `#1A1A1A` | `colors.grey[9]` | `#171717` | 主要文字 |
| `text-ds-dusty` | `#999999` | `colors.grey[56]` | `#8f8f8f` | 次要文字/说明文字 |
| `ds-black-40` | `#00000066` | `colors.black[40]` | `rgba(0,0,0,0.4)` | 透明黑色/边框 |
| `bg-white` | `#ffffff` | `colors.white.solid` | `#ffffff` | 卡片背景 |
| `text-ds-white` | `#ffffff` | `colors.white.solid` | `#ffffff` | Footer 白色文字 |

### 1.2 推荐的新颜色补充

| 使用场景 | 新设计系统颜色 | 值 | 说明 |
|---------|--------------|-----|------|
| 主要按钮/链接悬停 | `colors.azure[48]` | `#0070f3` | 品牌蓝色 |
| 强调色/标签 | `colors.cyan[57]` | `#45dec4` | 青色强调 |
| 错误/警告 | `colors.red[59]` | `#e5484d` | 错误红色 |
| 边框/分割线 | `colors.grey[92]` | `#ebebeb` | 浅灰边框 |
| 卡片背景 hover | `colors.grey[95]` | `#f2f2f2` | 浅灰背景 |

---

## 二、字体系统映射

### 2.1 字体族映射

| 当前类名 | 当前字体 | 新设计系统 | 新值 | 用途 |
|---------|---------|----------|------|------|
| `font-ds-display` | `Aboreto, cursive` | `typography.heading1.fontFamily` | `Inter` | 标题/展示字体 |
| `font-ds-sans` | `Inter, sans-serif` | `typography.body.fontFamily` | `Inter` | 正文字体 |
| `font-ds-mono` | `Montserrat, monospace` | `typography.body.fontFamily` | `Inter` | 等宽字体 |

**注意**: 新设计系统统一使用 `Inter` 字体，保持简洁一致性。

### 2.2 字体大小与样式映射

| 当前样式 | 新设计系统 | 具体样式 |
|---------|----------|---------|
| `text-4xl md:text-6xl` (标题) | `typography.heading1` | 72px, 600 weight |
| `text-2xl md:text-3xl` (副标题) | `typography.heading3` | 20px, 600 weight |
| `text-lg md:text-xl` (卡片标题) | `typography.heading5` | 14px, 400 weight |
| `text-sm md:text-base` (正文) | `typography.body` | 14px, 400 weight |
| `text-xs` (小字) | `fontSize[11]` | 11px, 400 weight |

---

## 三、间距系统映射

### 3.1 Padding/Margin 映射

| 当前 Tailwind 类 | 新设计系统 | 值 |
|-----------------|----------|-----|
| `p-6 md:p-8` | `spacing[32]` | 32px |
| `px-6 md:px-12` | `spacing[56]` | 56px |
| `pt-32 pb-12` | `spacing[56]` + `spacing[32]` | 56px + 32px |
| `gap-8` | `spacing[32]` | 32px |
| `gap-4` | `spacing[16]` | 16px |
| `mb-4` | `spacing[16]` | 16px |
| `mb-12 md:mb-20` | `spacing[56]` | 56px |

### 3.2 语义化间距

| 用途 | 推荐使用 | 值 |
|------|---------|-----|
| 组件内小间距 | `spacing.xs` | 8px |
| 组件间间距 | `spacing.s` | 16px |
| Section 间距 | `spacing.m` | 32px |
| 大型间距 | `spacing[56]` | 56px |

---

## 四、组件映射

### 4.1 Navbar 组件

#### 当前实现
```jsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-ds-cararra/90 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-end gap-12
                  font-ds-sans text-sm font-medium text-ds-cod tracking-wide">
    <Link to="/" className="hover:text-ds-dusty transition-colors">Works</Link>
  </div>
</nav>
```

#### 新设计系统实现
```jsx
<nav style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  background: `${colors.grey[98]}E6`, // 90% opacity
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${colors.grey[92]}`
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[56]}`,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing[32],
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.medium,
    color: colors.grey[9]
  }}>
    <Link>Works</Link>
  </div>
</nav>
```

### 4.2 ProjectCard 组件

#### 映射方案
| 原组件元素 | 新设计系统组件 | 说明 |
|-----------|--------------|------|
| ProjectCard 容器 | `Card` variant="elevated" | 使用带阴影的卡片 |
| 图片容器 | 保持原样式 + 新圆角 | 使用 `radius[15]` |
| 标题 | `typography.heading3` | 20px, 600 weight |
| 副标题 | `typography.body` + `colors.grey[56]` | 14px, 灰色 |
| 箭头图标 | 保持 lucide-react | 颜色改为 `colors.grey[9]` |

#### 新实现示例
```jsx
<Card variant="elevated" padding="none" hoverable>
  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
    <img src={image} style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.7s'
    }} />
  </div>
  <div style={{
    padding: spacing[32],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <h3 style={{...typography.heading3, color: colors.grey[9]}}>{title}</h3>
      <p style={{...typography.body, color: colors.grey[56]}}>{subtitle}</p>
    </div>
    <ArrowRight color={colors.grey[9]} />
  </div>
</Card>
```

### 4.3 GridCard 组件

#### 映射方案
- 容器：`Card` variant="default"
- 图片圆角：`radius[15]`
- 标题：`typography.heading5`
- 分类标签：`typography.body` + 小写 + `colors.grey[56]`

### 4.4 BlogCard 组件 (用于 Footer 暗色区域)

#### 映射方案
- 容器：`Card` variant="dark" 或自定义暗色样式
- 背景：`colors.grey[9]` (深色)
- 文字：`colors.white.solid`
- 副文字：`colors.grey[66]`

### 4.5 Section 组件

#### 新实现
```jsx
<section style={{
  padding: `${spacing[56]} 0`,
  background: dark ? colors.black.solid : colors.grey[98]
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[56]}`
  }}>
    {title && (
      <h2 style={{
        ...typography.heading1,
        fontSize: '48px',
        color: dark ? colors.white.solid : colors.grey[9],
        marginBottom: spacing[32]
      }}>
        {title}
      </h2>
    )}
    {subtitle && (
      <p style={{
        ...typography.body,
        color: colors.grey[56],
        marginBottom: spacing[32]
      }}>
        {subtitle}
      </p>
    )}
    {children}
  </div>
</section>
```

---

## 五、页面元素详细映射

### 5.1 Home 页面元素映射

#### Hero Section
| 元素 | 当前样式 | 新设计系统 |
|------|---------|----------|
| 背景 | `bg-ds-cararra` | `background: colors.grey[98]` |
| 标题 "SELECTED WORKS" | `font-ds-display text-6xl text-ds-cod` | `typography.heading1` + `colors.grey[9]` |
| 副标题 | `font-ds-sans text-ds-dusty text-base` | `typography.body` + `colors.grey[56]` |
| 容器内边距 | `pt-32 pb-12 px-12` | `padding: ${spacing[56]}` |

#### Selected Works Section
- **ProjectCard × 3**
  - 使用 `Card` variant="elevated"
  - 间距：`spacing[56]` (垂直)
  - 悬停效果：添加 `hoverable` 属性

#### AI Projects / Digital Projects Section
- **Section 容器**
  - 背景：`colors.grey[98]`
  - 内边距：`spacing[56]`
- **GridCard Grid**
  - 布局：`display: grid; gridTemplateColumns: 'repeat(2, 1fr)'`
  - 间距：`gap: ${spacing[32]}`
  - 使用 `Card` variant="default"

#### Footer (Dark Section)
| 元素 | 当前样式 | 新设计系统 |
|------|---------|----------|
| 背景 | `bg-ds-cod` | `background: colors.black.solid` |
| 标题文字 | `text-ds-cararra` | `color: colors.white.solid` |
| 副文字 | `text-ds-dusty` | `color: colors.grey[66]` |
| BlogCard × 6 | 暗色主题 | `Card` variant="dark" |
| 分割线 | `border-ds-white/10` | `border: 1px solid ${colors.white[0.2]}` |
| Contact 图标 | lucide-react | 保持，颜色改为 `colors.grey[66]` |
| 版权信息 | `text-ds-dusty/40` | `color: ${colors.grey[66]}; opacity: 0.4` |

### 5.2 About 页面元素映射

#### Profile Section
| 元素 | 当前样式 | 新设计系统 |
|------|---------|----------|
| 背景 | `bg-ds-cararra` | `background: colors.grey[98]` |
| 标题 "ABOUT ME" | `font-ds-display text-6xl text-ds-cod` | `typography.heading1` + `colors.grey[9]` |
| 正文段落 | `font-ds-sans text-ds-cod opacity-90` | `typography.body` + `colors.grey[9]` + `opacity: 0.9` |
| 下划线强调 | `underline decoration-2 decoration-ds-black-40` | `textDecoration: underline; textDecorationColor: ${colors.black[40]}` |
| 头像容器 | `rounded-full border-4 border-white shadow-2xl` | `borderRadius: '50%'; border: 4px solid ${colors.white.solid}; boxShadow: '0 20px 50px rgba(0,0,0,0.15)'` |
| 联系方式 | `text-ds-dusty` | `colors.grey[56]` |

#### Work With Section
- 背景：`colors.grey[98]`
- 标题：`typography.heading1` (48px)
- 公司名称：`typography.heading3`
- 效果：`opacity: 0.5; filter: grayscale(100%)`

#### Latest News Section
| 元素 | 当前样式 | 新设计系统 |
|------|---------|----------|
| 日期/Emoji | `font-ds-mono font-bold text-ds-cod` | `typography.body` + `fontWeight: 600` + `colors.grey[9]` |
| 内容文字 | `text-ds-black-40` | `colors.grey[40]` |
| Hover 效果 | `group-hover:text-ds-cod` | `color: ${colors.grey[9]}` on hover |
| 间距 | `space-y-8` | `gap: ${spacing[32]}` |

#### Extra Extra Section (Photo Grid)
- 容器圆角：`rounded-2xl` → `borderRadius: spacing[16]`
- 旋转效果：保持 `rotate-2` 等 CSS transform
- 间距：`gap-6` → `gap: ${spacing[32]}`

#### Footer
- 与 Home 页面 Footer 相同映射

---

## 六、交互效果映射

### 6.1 悬停效果 (Hover)

| 当前效果 | 新设计系统实现 |
|---------|--------------|
| `hover:text-ds-dusty` | `onMouseEnter: color = colors.grey[56]` |
| `hover:scale-105` | `onMouseEnter: transform = 'scale(1.05)'` |
| `hover:shadow-xl` | 使用 `Card` 的 `hoverable` 属性 |
| `group-hover:opacity-100` | 父元素 state 控制子元素 opacity |

### 6.2 过渡效果 (Transition)

| 当前效果 | 新设计系统实现 |
|---------|--------------|
| `transition-colors` | `transition: 'color 0.2s ease'` |
| `transition-transform duration-700` | `transition: 'transform 0.7s ease'` |
| `transition-all duration-500` | `transition: 'all 0.5s ease'` |

---

## 七、响应式设计映射

### 7.1 断点系统

| 当前 Tailwind 断点 | 新设计系统方案 |
|-------------------|--------------|
| `md:` (768px+) | `useMediaQuery('(min-width: 768px)')` |
| `lg:` (1024px+) | `useMediaQuery('(min-width: 1024px)')` |

### 7.2 响应式样式示例

```jsx
const isMobile = useMediaQuery('(max-width: 768px)');

<h1 style={{
  fontSize: isMobile ? '36px' : typography.heading1.fontSize,
  padding: isMobile ? spacing[32] : spacing[56]
}}>
  Title
</h1>
```

---

## 八、迁移优先级建议

### Phase 1: 基础样式迁移 (高优先级)
1. ✅ 颜色变量全局替换
2. ✅ 字体系统替换
3. ✅ 间距系统标准化

### Phase 2: 组件重构 (中优先级)
1. ⬜ Navbar 组件
2. ⬜ ProjectCard → 使用新 Card 组件
3. ⬜ GridCard → 使用新 Card 组件
4. ⬜ BlogCard → 使用新 Card 组件
5. ⬜ Section 组件

### Phase 3: 页面整合 (低优先级)
1. ⬜ Home 页面完整迁移
2. ⬜ About 页面完整迁移
3. ⬜ 响应式优化
4. ⬜ 交互效果优化

---

## 九、代码示例对比

### 9.1 Home Hero Section - Before & After

#### Before (Tailwind)
```jsx
<header className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
  <h1 className="font-ds-display text-4xl md:text-6xl text-ds-cod mb-6">
    SELECTED WORKS
  </h1>
  <p className="font-ds-sans text-ds-dusty text-sm md:text-base">
    2023-2024年 实习项目产出和复盘思考
  </p>
</header>
```

#### After (新设计系统)
```jsx
<header style={{
  paddingTop: spacing[56],
  paddingBottom: spacing[32],
  paddingLeft: spacing[56],
  paddingRight: spacing[56],
  maxWidth: '1200px',
  margin: '0 auto'
}}>
  <h1 style={{
    fontFamily: typography.heading1.fontFamily,
    fontSize: isMobile ? '36px' : '72px',
    fontWeight: typography.heading1.fontWeight,
    color: colors.grey[9],
    marginBottom: spacing[32]
  }}>
    SELECTED WORKS
  </h1>
  <p style={{
    ...typography.body,
    color: colors.grey[56]
  }}>
    2023-2024年 实习项目产出和复盘思考
  </p>
</header>
```

### 9.2 Card Component - Before & After

#### Before (自定义 ProjectCard)
```jsx
<div className="group relative block w-full bg-white rounded-3xl overflow-hidden
                hover:shadow-xl transition-all duration-500">
  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
    <img src={image} className="h-full w-full object-cover transition-transform
                                duration-700 group-hover:scale-105" />
  </div>
  <div className="flex items-center justify-between p-6 md:p-8">
    <div>
      <h3 className="font-ds-sans font-semibold text-lg md:text-xl text-ds-cod mb-1">
        {title}
      </h3>
      <p className="text-ds-dusty text-sm">{subtitle}</p>
    </div>
  </div>
</div>
```

#### After (使用新 Card 组件)
```jsx
<Card variant="elevated" padding="none" hoverable>
  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
    <img
      src={image}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.7s'
      }}
    />
  </div>
  <div style={{
    padding: spacing[32],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <h3 style={{
        ...typography.heading3,
        color: colors.grey[9],
        marginBottom: spacing.xs
      }}>
        {title}
      </h3>
      <p style={{
        ...typography.body,
        color: colors.grey[56],
        fontSize: '13px'
      }}>
        {subtitle}
      </p>
    </div>
    <ArrowRight color={colors.grey[9]} size={20} />
  </div>
</Card>
```

---

## 十、注意事项

### 10.1 保持原有设计意图
- ✅ 保持原有的视觉层次和布局
- ✅ 保持图片的宽高比和展示效果
- ✅ 保持动画和交互的流畅度

### 10.2 渐进式迁移
- 不要一次性全部替换，建议分组件逐步迁移
- 每次迁移后进行视觉对比和测试
- 保持版本控制，方便回滚

### 10.3 性能优化
- 使用 `React.memo` 优化组件渲染
- 避免内联样式对象重复创建，考虑提取为常量
- 图片使用懒加载

### 10.4 可访问性
- 确保颜色对比度符合 WCAG 标准
- 添加适当的 ARIA 标签
- 保持键盘导航功能

---

## 十一、快速参考表

### 常用颜色映射速查
```javascript
// 背景色
bg-ds-cararra      → colors.grey[98]
bg-white           → colors.white.solid
bg-ds-cod          → colors.black.solid

// 文字色
text-ds-cod        → colors.grey[9]
text-ds-dusty      → colors.grey[56]
text-ds-cararra    → colors.white.solid

// 边框
border-ds-white/10 → colors.white[0.2]
border-gray-200    → colors.grey[92]
```

### 常用间距速查
```javascript
gap-4   → spacing[16]
gap-8   → spacing[32]
p-6     → spacing[32]
px-12   → spacing[56]
mb-4    → spacing[16]
mb-12   → spacing[56]
```

### 常用字体速查
```javascript
text-6xl font-ds-display  → typography.heading1
text-xl font-semibold     → typography.heading3
text-base font-ds-sans    → typography.body
text-sm text-ds-dusty     → typography.body + colors.grey[56]
```

---

## 十二、后续优化建议

1. **创建样式工具函数**
   ```javascript
   // utils/styles.js
   export const createResponsiveSize = (mobile, desktop) => {
     const isMobile = useMediaQuery('(max-width: 768px)');
     return isMobile ? mobile : desktop;
   };
   ```

2. **组件封装复用**
   - 将常用的组合样式封装为独立组件
   - 例如：`<ResponsiveSection>`, `<ImageCard>`, `<ContactLink>`

3. **主题切换支持**
   - 为未来的深色模式做准备
   - 使用 Context API 管理全局主题状态

4. **样式文档化**
   - 为每个自定义组件添加 Storybook 文档
   - 维护设计系统使用指南

---

## 总结

本映射文档提供了从现有 Tailwind CSS 样式到新 Figma 设计系统的完整迁移路径。建议按照优先级分阶段执行，确保每个阶段都经过充分测试后再进行下一步。

**关键原则**：
- 保持设计一致性
- 渐进式迁移
- 充分测试
- 文档记录

---

**文档版本**: v1.0
**创建日期**: 2026-01-24
**最后更新**: 2026-01-24
