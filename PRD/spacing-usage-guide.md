# 间距系统使用指南

> 基于 Figma 的完整间距系统使用手册

---

## 🎯 快速开始

### 导入方式

```javascript
// 方式 1: 导入所有间距相关
import {
  spacing,
  width,
  height,
  borderRadius,
  layoutSpacing,
  componentSpacing,
} from '../design-system/tokens';

// 方式 2: 只导入需要的
import { spacing } from '../design-system/tokens/spacing';

// 方式 3: 导入工具函数
import { getSpacing, responsiveSpacing } from '../design-system/tokens';
```

---

## 📏 间距系统 (Spacing)

### 基础用法

```jsx
// 使用数字键
<div style={{ padding: spacing[4] }}>     // 16px
<div style={{ margin: spacing[8] }}>      // 32px
<div style={{ gap: spacing[2] }}>         // 8px

// 使用语义化键
<div style={{ padding: spacing.md }}>     // 16px
<div style={{ margin: spacing.xl }}>      // 32px
<div style={{ gap: spacing.xs }}>         // 8px
```

### 完整间距表

| 数字键 | 语义化 | 值 | 使用场景 |
|--------|--------|-----|---------|
| `spacing[0]` | - | 0px | 无间距 |
| `spacing[1]` | - | 4px | 极小间距 |
| `spacing[2]` | `spacing.xs` | 8px | Icon到文字、紧密元素 |
| `spacing[3]` | `spacing.sm` | 12px | 紧凑元素、小边距 |
| `spacing[4]` | `spacing.md` | 16px | **标准间距**、常用值 |
| `spacing[5]` | - | 20px | 介于标准和大之间 |
| `spacing[6]` | `spacing.lg` | 24px | 卡片内边距 |
| `spacing[8]` | `spacing.xl` | 32px | Section 内间距 |
| `spacing[10]` | - | 40px | 大间距 |
| `spacing[12]` | `spacing['2xl']` | 48px | 主要 Section 间距 |
| `spacing[14]` | - | 56px | 页面 Section 间距 |
| `spacing[16]` | `spacing['3xl']` | 64px | 大型 Section |
| `spacing[18]` | - | 72px | 超大间距 |
| `spacing[24]` | `spacing['4xl']` | 96px | Hero Section |
| `spacing[30]` | - | 120px | **Hero 顶部间距** |

### 推荐使用场景

#### 组件内间距
```jsx
// Button
<button style={{
  paddingLeft: spacing[4],   // 16px
  paddingRight: spacing[4],  // 16px
  paddingTop: spacing[2],    // 8px
  paddingBottom: spacing[2], // 8px
  gap: spacing[2],           // Icon 间距 8px
}}>

// Card
<div style={{
  padding: spacing[6],       // 24px 标准 Card padding
  gap: spacing[4],           // 16px 内容间距
}}>
```

#### 组件间间距
```jsx
// 相关元素
<div style={{ marginBottom: spacing[2] }}>  // 8px

// 一般间距
<div style={{ marginBottom: spacing[4] }}>  // 16px

// 组间间距
<div style={{ marginBottom: spacing[8] }}>  // 32px
```

#### 页面布局间距
```jsx
// Section 间距
<section style={{ paddingTop: spacing[14] }}>  // 56px

// Hero 顶部
<header style={{ paddingTop: spacing[30] }}>   // 120px

// 页面容器
<div style={{ padding: `0 ${spacing[14]}` }}>  // 0 56px
```

---

## 📐 宽度系统 (Width)

### Icon 宽度

```jsx
import { width } from '../design-system/tokens';

<Icon style={{ width: width.icon.md }} />  // 24px 标准图标
<Icon style={{ width: width.icon.lg }} />  // 32px 大图标
```

**Icon 尺寸表**:
- `width.icon.xs`: 16px - 极小图标
- `width.icon.sm`: 20px - 小图标
- `width.icon.md`: **24px - 标准图标** ⭐
- `width.icon.lg`: 32px - 大图标
- `width.icon.xl`: 40px - 特大图标

### Card 宽度

```jsx
// 不同尺寸的卡片
<Card style={{ width: width.card.sm }}>   // 280px
<Card style={{ width: width.card.md }}>   // 360px ⭐ 标准
<Card style={{ width: width.card.lg }}>   // 480px
```

**Card 宽度表**:
- `width.card.xs`: 240px - 窄卡片
- `width.card.sm`: 280px - 小卡片
- `width.card.md`: **360px - 标准卡片** ⭐
- `width.card.lg`: 480px - 大卡片
- `width.card.xl`: 600px - 超大卡片

### 容器宽度

```jsx
// 响应式容器
<div style={{
  maxWidth: width.container.xl,  // 1200px
  margin: '0 auto'
}}>
  Content
</div>

// 阅读宽度
<article style={{ maxWidth: width.prose }}>  // 720px
  Long text content...
</article>
```

**容器宽度表**:
- `width.container.xs`: 480px - 移动横屏
- `width.container.sm`: 640px - 平板竖屏
- `width.container.md`: 768px - 平板横屏
- `width.container.lg`: 1024px - 桌面
- `width.container.xl`: **1200px - 标准最大宽度** ⭐
- `width.container['2xl']`: 1280px - 超大桌面
- `width.container['3xl']`: 1536px - 超宽屏

**特殊宽度**:
- `width.prose`: **720px - 最佳阅读宽度** ⭐
- `width.content`: 1080px - 宽内容区

---

## 📏 高度系统 (Height)

### Button 高度

```jsx
import { height } from '../design-system/tokens';

<Button style={{ height: height.button.sm }}>Small</Button>   // 32px
<Button style={{ height: height.button.md }}>Medium</Button>  // 40px ⭐
<Button style={{ height: height.button.lg }}>Large</Button>   // 48px
```

**Button 高度表**:
- `height.button.xs`: 28px - 超小按钮
- `height.button.sm`: 32px - 小按钮
- `height.button.md`: **40px - 标准按钮** ⭐
- `height.button.lg`: 48px - 大按钮
- `height.button.xl`: 56px - 超大按钮

### Input 高度

```jsx
<Input style={{ height: height.input.md }} />  // 40px 标准输入框
```

**Input 高度表**:
- `height.input.sm`: 32px - 小输入框
- `height.input.md`: **40px - 标准输入框** ⭐
- `height.input.lg`: 48px - 大输入框
- `height.input.xl`: 56px - 超大输入框

### 布局高度

```jsx
// Navbar
<nav style={{ height: height.navbar }}>  // 64px

// Header
<header style={{ height: height.header }}>  // 80px
```

---

## 🔘 圆角系统 (Border Radius)

### 基础用法

```jsx
import { borderRadius } from '../design-system/tokens';

// 按钮
<button style={{ borderRadius: borderRadius.button }}>  // 6px

// 卡片
<div style={{ borderRadius: borderRadius.card }}>  // 12px

// 输入框
<input style={{ borderRadius: borderRadius.input }}>  // 6px

// 圆形
<div style={{
  borderRadius: borderRadius.full,  // 9999px
  width: '40px',
  height: '40px'
}}>
```

### 圆角大小表

| 键名 | 值 | 使用场景 |
|------|-----|---------|
| `borderRadius.none` | 0px | 无圆角 |
| `borderRadius.xs` | 4px | 小元素 |
| `borderRadius.sm` | **6px** | **按钮、输入框** ⭐ |
| `borderRadius.md` | 8px | 标准元素 |
| `borderRadius.lg` | **12px** | **卡片** ⭐ |
| `borderRadius.xl` | 16px | 大卡片 |
| `borderRadius['2xl']` | 20px | Modal |
| `borderRadius['3xl']` | 24px | Hero |
| `borderRadius.full` | 9999px | 圆形 |

**语义化别名**:
- `borderRadius.button`: 6px
- `borderRadius.input`: 6px
- `borderRadius.card`: 12px
- `borderRadius.modal`: 16px
- `borderRadius.circle`: 9999px

---

## 📏 边框宽度 (Border Width)

### 基础用法

```jsx
import { borderWidth } from '../design-system/tokens';

// 标准边框
<div style={{ border: `${borderWidth.thin} solid #000` }}>

// 聚焦边框
<input style={{ border: `${borderWidth.focus} solid #0070f3` }}>

// 分割线
<hr style={{ height: borderWidth.divider }}>
```

### 边框宽度表

| 键名 | 值 | 使用场景 |
|------|-----|---------|
| `borderWidth.none` | 0px | 无边框 |
| `borderWidth.hairline` | 0.5px | 极细边框 (Retina) |
| `borderWidth.thin` | **1px** | **标准边框** ⭐ |
| `borderWidth.medium` | 1.5px | 中等边框 |
| `borderWidth.thick` | 2px | 粗边框 |
| `borderWidth.heavy` | 3px | 特粗边框 |
| `borderWidth.ultra` | 4px | 超粗边框 |

**语义化别名**:
- `borderWidth.default`: 1px
- `borderWidth.input`: 1px
- `borderWidth.focus`: 2px
- `borderWidth.divider`: 1px
- `borderWidth.outline`: 2px

---

## 🧩 组件专用间距 (Component Spacing)

### Button 间距

```jsx
import { componentSpacing } from '../design-system/tokens';

<button style={{
  paddingLeft: componentSpacing.button.paddingX.md,   // 16px
  paddingRight: componentSpacing.button.paddingX.md,  // 16px
  paddingTop: componentSpacing.button.paddingY.md,    // 8px
  paddingBottom: componentSpacing.button.paddingY.md, // 8px
  gap: componentSpacing.button.gap,                   // 8px (icon间距)
}}>
  <Icon /> Button Text
</button>
```

### Card 间距

```jsx
<div style={{
  padding: componentSpacing.card.padding.md,  // 24px
  gap: componentSpacing.card.gap,             // 16px (内容间距)
}}>
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

**Card Padding 选项**:
- `componentSpacing.card.padding.none`: 0px
- `componentSpacing.card.padding.sm`: 16px
- `componentSpacing.card.padding.md`: **24px** ⭐
- `componentSpacing.card.padding.lg`: 32px
- `componentSpacing.card.padding.xl`: 40px

### Input 间距

```jsx
<input style={{
  paddingLeft: componentSpacing.input.paddingX,   // 12px
  paddingRight: componentSpacing.input.paddingX,  // 12px
  paddingTop: componentSpacing.input.paddingY,    // 8px
  paddingBottom: componentSpacing.input.paddingY, // 8px
}}>
```

---

## 🏗️ 布局间距 (Layout Spacing)

### 页面边距

```jsx
import { layoutSpacing } from '../design-system/tokens';
import { useMediaQuery } from '../design-system';

const isMobile = useMediaQuery('(max-width: 768px)');

<div style={{
  padding: isMobile
    ? layoutSpacing.page.mobile   // 16px
    : layoutSpacing.page.desktop  // 56px
}}>
```

**响应式页面边距**:
- `layoutSpacing.page.mobile`: 16px
- `layoutSpacing.page.tablet`: 24px
- `layoutSpacing.page.desktop`: 56px

### Section 间距

```jsx
// 标准 Section 间距
<section style={{
  paddingTop: layoutSpacing.section.md,     // 56px
  paddingBottom: layoutSpacing.section.md,  // 56px
}}>

// 大 Section 间距
<section style={{
  paddingTop: layoutSpacing.section.lg,     // 72px
  paddingBottom: layoutSpacing.section.lg,  // 72px
}}>
```

**Section 间距选项**:
- `layoutSpacing.section.xs`: 32px - 紧密 Section
- `layoutSpacing.section.sm`: 40px - 小 Section
- `layoutSpacing.section.md`: **56px - 标准 Section** ⭐
- `layoutSpacing.section.lg`: 72px - 大 Section
- `layoutSpacing.section.xl`: 96px - 超大 Section

### Hero 间距

```jsx
// Hero Section 特殊间距
<header style={{
  paddingTop: layoutSpacing.hero.top,      // 120px
  paddingBottom: layoutSpacing.hero.bottom, // 72px
}}>
  <h1>Hero Title</h1>
</header>
```

---

## 🎨 实际使用示例

### 完整的 Card 组件

```jsx
import {
  spacing,
  borderRadius,
  borderWidth,
  componentSpacing,
} from '../design-system/tokens';
import { colors } from '../design-system/tokens';

const Card = ({ children }) => {
  return (
    <div style={{
      // 圆角
      borderRadius: borderRadius.card,  // 12px

      // 边框
      border: `${borderWidth.thin} solid ${colors.grey[92]}`,  // 1px

      // 内边距
      padding: componentSpacing.card.padding.md,  // 24px

      // 背景
      background: colors.white.solid,

      // 间距(子元素)
      display: 'flex',
      flexDirection: 'column',
      gap: componentSpacing.card.gap,  // 16px
    }}>
      {children}
    </div>
  );
};
```

### 完整的 Button 组件

```jsx
import {
  height,
  borderRadius,
  componentSpacing,
} from '../design-system/tokens';
import { colors, typography } from '../design-system/tokens';

const Button = ({ children, size = 'md' }) => {
  return (
    <button style={{
      // 高度
      height: height.button[size],  // 40px (md)

      // 内边距
      paddingLeft: componentSpacing.button.paddingX[size],   // 16px
      paddingRight: componentSpacing.button.paddingX[size],  // 16px

      // 圆角
      borderRadius: borderRadius.button,  // 6px

      // 字体
      ...typography.button,

      // 颜色
      background: colors.black.solid,
      color: colors.white.solid,

      // Icon 间距
      display: 'flex',
      alignItems: 'center',
      gap: componentSpacing.button.gap,  // 8px

      // 边框
      border: 'none',
      cursor: 'pointer',
    }}>
      {children}
    </button>
  );
};
```

### 完整的页面布局

```jsx
import {
  spacing,
  width,
  layoutSpacing,
} from '../design-system/tokens';
import { useMediaQuery } from '../design-system';

const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        paddingTop: layoutSpacing.hero.top,      // 120px
        paddingBottom: layoutSpacing.hero.bottom, // 72px
        paddingLeft: isMobile ? spacing[4] : spacing[14],   // 16px / 56px
        paddingRight: isMobile ? spacing[4] : spacing[14],  // 16px / 56px
        maxWidth: width.container.xl,  // 1200px
        margin: '0 auto',
      }}>
        <h1>Hero Title</h1>
        <p style={{ marginTop: spacing[4] }}>Description</p>
      </section>

      {/* Content Section */}
      <section style={{
        paddingTop: layoutSpacing.section.md,      // 56px
        paddingBottom: layoutSpacing.section.md,   // 56px
        paddingLeft: isMobile ? spacing[4] : spacing[14],
        paddingRight: isMobile ? spacing[4] : spacing[14],
        maxWidth: width.container.xl,
        margin: '0 auto',
      }}>
        <h2 style={{ marginBottom: spacing[6] }}>Section Title</h2>

        {/* Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: spacing[8],  // 32px
        }}>
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </div>
  );
};
```

---

## 🛠️ 工具函数

### getSpacing()

根据倍数计算间距值。

```jsx
import { getSpacing } from '../design-system/tokens';

// 基础单位是 8px
<div style={{ padding: getSpacing(2) }}>  // 16px (2 × 8)
<div style={{ margin: getSpacing(4) }}>   // 32px (4 × 8)
<div style={{ gap: getSpacing(1) }}>      // 8px (1 × 8)
```

### responsiveSpacing()

创建响应式间距。

```jsx
import { responsiveSpacing } from '../design-system/tokens';
import { useMediaQuery } from '../design-system';

const isMobile = useMediaQuery('(max-width: 768px)');
const { mobile, desktop } = responsiveSpacing(4, 14);

<div style={{
  padding: isMobile ? mobile : desktop  // 16px / 56px
}}>
```

---

## 📝 最佳实践

### ✅ 推荐做法

1. **使用语义化命名**
```jsx
// ✅ 好
<div style={{ gap: spacing.md }}>

// ❌ 避免
<div style={{ gap: '16px' }}>
```

2. **使用专用间距**
```jsx
// ✅ 好 - 使用组件专用间距
<Card style={{ padding: componentSpacing.card.padding.md }}>

// ❌ 避免 - 硬编码
<Card style={{ padding: '24px' }}>
```

3. **响应式间距**
```jsx
// ✅ 好 - 使用响应式间距
const padding = isMobile ? spacing[4] : spacing[14];

// ❌ 避免 - 硬编码断点
const padding = isMobile ? '16px' : '56px';
```

4. **保持一致性**
```jsx
// ✅ 好 - 使用系统中的值
<div style={{ marginBottom: spacing[8] }}>  // 32px

// ❌ 避免 - 使用系统外的值
<div style={{ marginBottom: '30px' }}>
```

### ⚠️ 注意事项

1. **避免混用数字键和语义键**
```jsx
// ✅ 统一使用数字键
padding: spacing[4]
gap: spacing[2]

// 或者统一使用语义键
padding: spacing.md
gap: spacing.xs

// ❌ 避免混用
padding: spacing[4]
gap: spacing.xs
```

2. **选择合适的间距类型**
```jsx
// 组件内使用 componentSpacing
<Button style={{ padding: componentSpacing.button.paddingX.md }}>

// 布局使用 layoutSpacing
<Section style={{ padding: layoutSpacing.section.md }}>

// 通用使用 spacing
<div style={{ gap: spacing[4] }}>
```

---

## 📊 间距系统速查表

### 最常用的值 ⭐

| 值 | 键名 | 使用场景 | 频率 |
|----|------|---------|------|
| 8px | `spacing[2]` / `spacing.xs` | Icon间距、紧密元素 | ⭐⭐⭐⭐⭐ |
| 16px | `spacing[4]` / `spacing.md` | 标准间距、组件间距 | ⭐⭐⭐⭐⭐ |
| 24px | `spacing[6]` / `spacing.lg` | Card padding | ⭐⭐⭐⭐ |
| 32px | `spacing[8]` / `spacing.xl` | Section 内间距 | ⭐⭐⭐⭐ |
| 56px | `spacing[14]` | Section 间距、页面边距 | ⭐⭐⭐⭐ |
| 120px | `spacing[30]` | Hero 顶部间距 | ⭐⭐⭐ |

---

## 🔗 相关文档

- [Figma 间距分析文档](./figma-spacing-analysis.md) - 详细的间距系统分析
- [设计系统迁移映射](./design-system-migration-mapping.md) - 迁移指南
- [快速参考指南](./quick-reference-guide.md) - 快速查找

---

**文档版本**: v1.0
**创建日期**: 2026-01-24
**最后更新**: 2026-01-24
