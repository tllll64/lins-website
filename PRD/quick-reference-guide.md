# 设计系统迁移 - 快速参考指南

> 简化版映射表，用于快速查找替换方案

---

## 🎨 颜色替换速查表

| 旧样式 | 新设计系统 | 十六进制 |
|--------|----------|---------|
| `bg-ds-cararra` | `colors.grey[98]` | `#fafafa` |
| `text-ds-cod` | `colors.grey[9]` | `#171717` |
| `text-ds-dusty` | `colors.grey[56]` | `#8f8f8f` |
| `bg-ds-cod` | `colors.black.solid` | `#000000` |
| `text-ds-white` | `colors.white.solid` | `#ffffff` |
| `bg-white` | `colors.white.solid` | `#ffffff` |

**新增推荐色**：
- 品牌蓝：`colors.azure[48]` (#0070f3)
- 强调青：`colors.cyan[57]` (#45dec4)
- 错误红：`colors.red[59]` (#e5484d)
- 边框灰：`colors.grey[92]` (#ebebeb)

---

## 📝 字体替换速查表

| 旧样式 | 新设计系统 |
|--------|----------|
| `font-ds-display` | `typography.heading1.fontFamily` (Inter) |
| `font-ds-sans` | `typography.body.fontFamily` (Inter) |
| `text-6xl` | `typography.heading1` (72px/48px移动端) |
| `text-3xl` | `typography.heading3` (20px) |
| `text-xl` | `typography.heading5` (14px) |
| `text-base` | `typography.body` (14px) |
| `text-sm` | `typography.body` (14px) |
| `text-xs` | `fontSize[11]` (11px) |

---

## 📏 间距替换速查表

| Tailwind | 新设计系统 | 值 |
|----------|----------|-----|
| `gap-4` / `p-4` | `spacing[16]` | 16px |
| `gap-6` / `p-6` | `spacing[32]` | 32px |
| `gap-8` / `p-8` | `spacing[32]` | 32px |
| `px-12` | `spacing[56]` | 56px |
| `py-20` | `spacing[56]` | 56px |
| `mb-4` | `spacing[16]` | 16px |
| `mb-6` | `spacing[32]` | 32px |

**语义化间距**：
- 小间距：`spacing.xs` (8px)
- 中间距：`spacing.s` (16px)
- 大间距：`spacing.m` (32px)

---

## 🧩 组件替换对照

### ProjectCard → Card
```jsx
// 旧
<div className="bg-white rounded-3xl hover:shadow-xl">

// 新
<Card variant="elevated" padding="none" hoverable>
```

### GridCard → Card
```jsx
// 旧
<div className="group cursor-pointer">

// 新
<Card variant="default" padding="medium" hoverable>
```

### BlogCard → Card (暗色)
```jsx
// 旧
<div className="bg-ds-white/10">

// 新
<Card variant="dark" padding="medium">
```

---

## 🔄 常见样式模式替换

### 1. 标题样式
```jsx
// 旧
<h1 className="font-ds-display text-6xl text-ds-cod mb-6">

// 新
<h1 style={{
  ...typography.heading1,
  color: colors.grey[9],
  marginBottom: spacing[32]
}}>
```

### 2. 正文样式
```jsx
// 旧
<p className="font-ds-sans text-ds-dusty text-sm">

// 新
<p style={{
  ...typography.body,
  color: colors.grey[56]
}}>
```

### 3. 容器样式
```jsx
// 旧
<div className="max-w-7xl mx-auto px-12">

// 新
<div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${spacing[56]}`
}}>
```

### 4. Flex 布局
```jsx
// 旧
<div className="flex items-center justify-between gap-8">

// 新
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[32]
}}>
```

### 5. Grid 布局
```jsx
// 旧
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// 新
<div style={{
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
  gap: spacing[32]
}}>
```

---

## 🎯 核心组件使用示例

### Button
```jsx
<Button variant="primary" size="medium">
  Click me
</Button>

<Button variant="secondary" size="small">
  Secondary
</Button>
```

### Card
```jsx
// 默认卡片
<Card variant="default" padding="medium">
  Content
</Card>

// 带阴影卡片
<Card variant="elevated" padding="medium" hoverable>
  Content
</Card>

// 暗色卡片（Footer用）
<Card variant="dark" padding="medium">
  Content
</Card>
```

### Input
```jsx
<Input
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={handleChange}
/>
```

### SegmentedControl
```jsx
<SegmentedControl
  options={[
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' }
  ]}
  value={selected}
  onChange={setSelected}
/>
```

---

## 📱 响应式设计

### 使用 useMediaQuery Hook
```jsx
import { useMediaQuery } from '../design-system';

const isMobile = useMediaQuery('(max-width: 768px)');

<h1 style={{
  fontSize: isMobile ? '36px' : typography.heading1.fontSize
}}>
```

### 常用断点
- 移动端：`(max-width: 768px)`
- 平板：`(min-width: 769px) and (max-width: 1024px)`
- 桌面：`(min-width: 1025px)`

---

## ⚡ 动画效果

### Hover 效果
```jsx
<div
  onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[9]}
  onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[56]}
  style={{ transition: 'color 0.2s ease' }}
>
```

### Scale 效果
```jsx
<img
  style={{ transition: 'transform 0.7s ease' }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
/>
```

---

## ✅ 迁移检查清单

### 页面级别
- [ ] 背景色替换 (`bg-ds-cararra` → `colors.grey[98]`)
- [ ] 最大宽度统一 (`max-w-7xl` → `1200px`)
- [ ] 间距标准化

### 组件级别
- [ ] Navbar 样式更新
- [ ] ProjectCard → Card 组件
- [ ] GridCard → Card 组件
- [ ] BlogCard → Card 组件
- [ ] Section 组件样式

### 文本级别
- [ ] 字体族统一为 Inter
- [ ] 标题使用 `typography.heading*`
- [ ] 正文使用 `typography.body`
- [ ] 颜色使用设计系统色值

### 交互级别
- [ ] Hover 效果一致性
- [ ] 过渡动画流畅度
- [ ] 响应式断点适配

---

## 🚀 导入方式

```javascript
// 导入所有需要的内容
import { Button, Input, Card, SegmentedControl } from '../design-system/components';
import { colors, spacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
```

---

## 📋 Next Steps

1. 复制现有组件，创建 `*_new.jsx` 版本
2. 在新版本中应用设计系统样式
3. 视觉对比测试
4. 确认无误后替换原组件
5. 更新 imports

---

**Tips**：
- 保持原有的语义化命名
- 逐步迁移，不要一次性全改
- 每次修改后检查浏览器渲染效果
- 使用版本控制，方便回滚

**快速访问设计系统预览**：
```
http://localhost:5175/design-system
```
