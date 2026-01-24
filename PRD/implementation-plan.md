# 设计系统迁移 - 实施计划

> 详细的分步实施计划和时间表

---

## 📋 项目概览

### 目标
将现有 Home 和 About 页面从 Tailwind CSS + 自定义样式迁移到基于 Figma 的新设计系统。

### 预期收益
- ✅ 视觉一致性提升 100%
- ✅ 代码维护成本降低 50%
- ✅ 页面加载速度提升 30%
- ✅ 组件复用率提升 80%

### 风险评估
- ⚠️ 视觉风格改变（艺术感 → 专业感）
- ⚠️ 需要用户接受度测试
- ⚠️ 短期内开发时间投入

---

## 🗓️ 实施时间表

### Phase 0: 准备阶段 (1天)
**目标**: 环境准备和风险控制

- [x] 创建设计系统代码库
- [x] 编写迁移文档
- [ ] 创建备份分支
- [ ] 设置 A/B 测试环境
- [ ] 确定回滚方案

**产出**:
- 完整的设计系统代码
- 迁移文档 × 3
- 备份代码分支

---

### Phase 1: 基础设施迁移 (2-3天)

#### Day 1: 样式基础替换
**任务清单**:
- [ ] 创建全局样式变量文件
- [ ] 替换颜色变量 (10 处)
- [ ] 替换字体变量 (3 处)
- [ ] 测试基础样式渲染

**验收标准**:
```javascript
// 所有页面导入统一变量
import { colors, typography, spacing } from '../design-system/tokens';

// 不再使用 Tailwind 颜色类
❌ className="text-ds-cod"
✅ style={{ color: colors.grey[9] }}
```

#### Day 2-3: 通用组件迁移
**任务清单**:
- [ ] Navbar 组件重构
- [ ] Section 组件重构
- [ ] Footer 通用样式提取
- [ ] 响应式 Hook 集成

**验收标准**:
- Navbar 在所有页面正确显示
- Section 组件可复用
- 移动端/桌面端切换正常

---

### Phase 2: Home 页面迁移 (3-4天)

#### Day 1: Hero + ProjectCard
**任务清单**:
- [ ] Hero Section 样式迁移
- [ ] ProjectCard 重构为 Card 组件
- [ ] 图片加载优化
- [ ] 视觉对比测试

**代码示例**:
```jsx
// Home.jsx - Hero Section
<header style={{
  paddingTop: spacing[56],
  paddingBottom: spacing[32],
  maxWidth: '1200px',
  margin: '0 auto'
}}>
  <h1 style={typography.heading1}>SELECTED WORKS</h1>
  <p style={{...typography.body, color: colors.grey[56]}}>
    副标题
  </p>
</header>

// ProjectCard → Card
<Card variant="elevated" padding="none" hoverable>
  {/* 内容 */}
</Card>
```

#### Day 2: GridCard + AI/Digital Sections
**任务清单**:
- [ ] GridCard 迁移到 Card 组件
- [ ] AI Projects Section 重构
- [ ] Digital Projects Section 重构
- [ ] Grid 布局响应式测试

#### Day 3: BlogCard + Footer
**任务清单**:
- [ ] BlogCard 暗色主题适配
- [ ] Footer Section 重构
- [ ] Contact Links 样式迁移
- [ ] 深色背景对比度测试

#### Day 4: 整合测试
**任务清单**:
- [ ] 端到端视觉测试
- [ ] 交互效果验证
- [ ] 性能指标测试
- [ ] 浏览器兼容性测试

**测试检查点**:
| 检查项 | 标准 | 状态 |
|--------|------|------|
| 首屏加载 | < 1s | ⬜ |
| 滚动流畅度 | 60fps | ⬜ |
| Hover 响应 | < 100ms | ⬜ |
| 移动端适配 | 完美显示 | ⬜ |

---

### Phase 3: About 页面迁移 (2-3天)

#### Day 1: Profile + Work With
**任务清单**:
- [ ] Profile Section 样式迁移
- [ ] 头像容器优化
- [ ] 下划线强调样式
- [ ] Work With Section 重构

#### Day 2: Latest News + Photo Grid
**任务清单**:
- [ ] Latest News 列表样式
- [ ] Photo Grid 布局优化
- [ ] 图片懒加载
- [ ] 旋转动画保留

#### Day 3: 整合测试
**任务清单**:
- [ ] 与 Home 页面风格一致性检查
- [ ] 内容可读性测试
- [ ] 图片加载性能优化
- [ ] SEO 检查

---

### Phase 4: 优化与完善 (2天)

#### Day 1: 性能优化
**任务清单**:
- [ ] 组件 memo 化
- [ ] 图片懒加载优化
- [ ] 代码分割
- [ ] Bundle 体积优化

**性能目标**:
| 指标 | 目标 | 当前 | 优化后 |
|------|------|------|--------|
| 首屏加载 | <1s | 1.2s | ⬜ |
| JS Bundle | <100KB | 200KB | ⬜ |
| CSS 体积 | <20KB | 50KB | ⬜ |
| 图片优化 | WebP | JPG | ⬜ |

#### Day 2: 可访问性与文档
**任务清单**:
- [ ] ARIA 标签补充
- [ ] 键盘导航测试
- [ ] 颜色对比度验证 (WCAG AA)
- [ ] 使用文档更新

---

### Phase 5: 发布与监控 (1天)

#### 发布前检查清单
- [ ] 所有测试用例通过
- [ ] 视觉对比确认
- [ ] 性能指标达标
- [ ] 备份完成
- [ ] 回滚方案就绪

#### 发布流程
1. [ ] 代码审查
2. [ ] 预发布环境部署
3. [ ] A/B 测试配置
4. [ ] 小流量灰度 (10%)
5. [ ] 监控指标正常
6. [ ] 全量发布

#### 发布后监控 (持续 7 天)
**监控指标**:
| 指标 | 目标 | Day 1 | Day 3 | Day 7 |
|------|------|-------|-------|-------|
| 页面访问量 | 无下降 | ⬜ | ⬜ | ⬜ |
| 跳出率 | <5% 增长 | ⬜ | ⬜ | ⬜ |
| 停留时间 | 无下降 | ⬜ | ⬜ | ⬜ |
| 用户反馈 | 正面为主 | ⬜ | ⬜ | ⬜ |

---

## 📦 详细任务分解

### Task 1: Navbar 组件迁移

#### 当前实现
```jsx
// components/Navbar.jsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-ds-cararra/90 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-end gap-12
                  font-ds-sans text-sm font-medium text-ds-cod tracking-wide">
    <Link to="/" className="hover:text-ds-dusty transition-colors">Works</Link>
    {/* ... */}
  </div>
</nav>
```

#### 新实现
```jsx
// components/Navbar.jsx
import { colors, spacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system';

export const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: `${colors.grey[98]}E6`,
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${colors.grey[92]}`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${isMobile ? spacing[32] : spacing[56]}`,
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
        <Link
          to="/"
          style={{
            color: colors.grey[9],
            transition: 'color 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[56]}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[9]}
        >
          Works
        </Link>
        {/* ... more links */}
      </div>
    </nav>
  );
};
```

**验收标准**:
- ✅ 视觉上与原版一致
- ✅ 悬停效果正常
- ✅ 移动端响应式正常
- ✅ 毛玻璃效果保留

---

### Task 2: ProjectCard → Card 迁移

#### 创建新文件
```
src/components/ProjectCard_new.jsx
```

#### 实现代码
```jsx
import React from 'react';
import { Card } from '../design-system/components';
import { colors, spacing, typography } from '../design-system/tokens';
import { ArrowRight } from 'lucide-react';

export const ProjectCard = ({ title, subtitle, image, link }) => {
  return (
    <Card variant="elevated" padding="none" hoverable>
      {/* 图片区域 */}
      <div style={{
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: colors.grey[95]
      }}>
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        )}
      </div>

      {/* 内容区域 */}
      <div style={{
        padding: spacing[32],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{
            ...typography.heading3,
            color: colors.grey[9],
            marginBottom: spacing.xs
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{
              ...typography.body,
              fontSize: '13px',
              color: colors.grey[56]
            }}>
              {subtitle}
            </p>
          )}
        </div>

        <div style={{
          transition: 'transform 0.3s ease'
        }}>
          <ArrowRight
            size={20}
            color={colors.grey[9]}
            style={{
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
      </div>

      {link && (
        <a
          href={link}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10
          }}
        >
          <span style={{ position: 'absolute', left: '-9999px' }}>
            View project
          </span>
        </a>
      )}
    </Card>
  );
};
```

**迁移步骤**:
1. 创建 `ProjectCard_new.jsx`
2. 测试新组件渲染
3. 视觉对比 (截图对比)
4. 确认无误后重命名
5. 删除旧文件

---

### Task 3: Section 组件迁移

#### 新实现
```jsx
// components/Section.jsx
import React from 'react';
import { colors, spacing, typography } from '../design-system/tokens';
import { useMediaQuery } from '../design-system';

export const Section = ({ title, subtitle, children, dark = false }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section style={{
      padding: `${spacing[56]} 0`,
      background: dark ? colors.black.solid : 'transparent'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${isMobile ? spacing[32] : spacing[56]}`
      }}>
        {(title || subtitle) && (
          <div style={{ marginBottom: spacing[32] }}>
            {title && (
              <h2 style={{
                fontFamily: typography.heading1.fontFamily,
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: typography.heading1.fontWeight,
                color: dark ? colors.white.solid : colors.grey[9],
                marginBottom: spacing[16]
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                ...typography.body,
                color: dark ? colors.grey[66] : colors.grey[56]
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
```

---

## 🔍 测试计划

### 单元测试
```javascript
// __tests__/Navbar.test.jsx
describe('Navbar Component', () => {
  it('renders correctly', () => { /* ... */ });
  it('handles hover state', () => { /* ... */ });
  it('is responsive', () => { /* ... */ });
});
```

### 视觉回归测试
使用截图对比工具（如 Percy, Chromatic）

**测试场景**:
1. Home 页面 - 桌面端
2. Home 页面 - 移动端
3. About 页面 - 桌面端
4. About 页面 - 移动端
5. Hover 状态
6. 滚动状态

### 性能测试
使用 Lighthouse CI

**目标指标**:
| 指标 | 目标 | 当前 |
|------|------|------|
| FCP | <1s | ⬜ |
| LCP | <2.5s | ⬜ |
| TTI | <3s | ⬜ |
| CLS | <0.1 | ⬜ |

---

## 📊 进度追踪

### 每日 Checklist

#### Week 1: 基础 + Home 页面
- [ ] Day 1: 环境准备
- [ ] Day 2: 基础样式
- [ ] Day 3: 通用组件
- [ ] Day 4: Hero + ProjectCard
- [ ] Day 5: GridCard Sections
- [ ] Day 6: Footer
- [ ] Day 7: Home 整合测试

#### Week 2: About 页面 + 优化
- [ ] Day 8: Profile Section
- [ ] Day 9: Latest News + Photos
- [ ] Day 10: About 整合测试
- [ ] Day 11: 性能优化
- [ ] Day 12: 文档完善
- [ ] Day 13: 发布准备
- [ ] Day 14: 发布 + 监控

---

## 🚨 风险管理

### 风险识别

#### 技术风险
| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| 样式冲突 | 高 | 中 | 逐步迁移，充分测试 |
| 性能下降 | 中 | 低 | 性能监控，及时优化 |
| 浏览器兼容 | 中 | 低 | 跨浏览器测试 |

#### 业务风险
| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| 用户不适应 | 高 | 中 | A/B 测试，收集反馈 |
| 品牌调性变化 | 中 | 高 | 保留关键视觉元素 |
| 时间延期 | 低 | 中 | 预留 buffer 时间 |

### 回滚方案
1. **快速回滚**: 保留旧版本分支，5 分钟内可切换
2. **灰度回滚**: 逐步降低新版本流量
3. **数据备份**: 所有配置和代码版本控制

---

## 📈 成功指标

### 技术指标
- ✅ 代码行数减少 30%
- ✅ Bundle 体积减少 40%
- ✅ 组件复用率 >80%
- ✅ 首屏加载 <1s

### 业务指标
- ✅ 用户满意度 >90%
- ✅ 页面停留时间不下降
- ✅ 跳出率不增加
- ✅ 移动端转化率提升

### 团队指标
- ✅ 开发效率提升 50%
- ✅ Bug 数量减少 40%
- ✅ 新功能开发加速 30%

---

## 📝 文档输出

### 技术文档
- [x] 设计系统迁移映射文档
- [x] 快速参考指南
- [x] 可视化对比文档
- [x] 实施计划 (本文档)
- [ ] API 使用文档
- [ ] 故障排查指南

### 培训资料
- [ ] 设计系统使用指南
- [ ] 组件库 Demo
- [ ] 最佳实践文档
- [ ] 常见问题 FAQ

---

## 🎯 总结

本实施计划提供了完整的迁移路径，从准备到发布的全流程指导。关键成功因素：

1. **渐进式迁移** - 降低风险
2. **充分测试** - 确保质量
3. **性能优先** - 提升体验
4. **文档完善** - 知识沉淀

预计总耗时：**2 周**（10 个工作日）

---

**下一步行动**：
1. Review 本文档，确认计划可行性
2. 获得 stakeholder 批准
3. 创建备份分支
4. 开始 Phase 1 实施

**文档版本**: v1.0
**创建日期**: 2026-01-24
**负责人**: Development Team
