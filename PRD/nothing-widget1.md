请帮我在网站works页面头部的点阵区域，复刻一个 Nothing 风格的『文字时钟 (Word Clock)』 前端组件。

组件参考链接：https://playground.nothing.tech/detail/app/3AoD69miwl7cKCd8


1. 核心视觉 (Visuals):

整体外观： 一个深黑色（#121212）的圆角矩形容器，圆角半径较大（约 40px）。

点阵背景： 容器背景需要有 Nothing 标志性的灰色细小点阵（Dot Grid）。

文字矩阵： 容器内填满大写的英文字母。这些字母应排列成整齐的网格（Grid）。

点亮效果： 默认状态下，所有字母为暗灰色（低透明度）。字母点亮字段为“THIS IS MY WEBSITE”，颜色变为纯白色，并带有微弱的白色发光效果（Text-shadow）。

2. 交互样式：

流光掠影 (Glitch/Scanning): 每隔 15 秒，有一道极窄的垂直光束（高亮效果）像扫描仪一样从左至右划过整个矩阵，瞬间点亮所有字母又迅速熄灭。


2. 技术要求：

HTML/CSS/JS： 使用原生代码或 React/Framer Motion 实现。

响应式： 组件应在手机和桌面端都能完美适配。

字体： 优先使用类似点阵风格的无衬线字体（如 'Inter' 或 Nothing 专用的点阵字体库）。