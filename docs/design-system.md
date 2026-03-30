# 设计系统

## 美学方向

核心关键词：**故障（Glitch）、点阵（Dot-Matrix）、复古（Retro）、科技（Tech）、低饱和（Low Saturation）、高对比（High Contrast）**

- 深色主题为基底，所有页面使用 `#0a0a0c` 背景
- 像素化边缘（锯齿感裁剪，非平滑圆角）
- CRT 扫描线 + 噪点覆盖层
- 终端式 UI 标签（`> SYSTEM.BOOT // DIGITAL_GHOST v1.0`）

---

## 色彩系统

所有颜色通过 CSS 自定义属性定义在 `src/app/globals.css` 的 `@theme` 块中，Tailwind v4 自动识别为实用类。

### 背景色

| 变量 | 值 | Tailwind 类 | 用途 |
|------|-----|------------|------|
| `--color-bg-primary` | `#0a0a0c` | `bg-bg-primary` | 页面主背景 |
| `--color-bg-secondary` | `#12121a` | `bg-bg-secondary` | 面板、卡片背景 |
| `--color-bg-tertiary` | `#1a1a24` | `bg-bg-tertiary` | 抬升表面、代码块 |
| `--color-bg-hover` | `#22222e` | `bg-bg-hover` | 悬停状态背景 |

### 文字色

| 变量 | 值 | Tailwind 类 | 用途 |
|------|-----|------------|------|
| `--color-text-primary` | `#e0e0e4` | `text-text-primary` | 标题、主要文字 |
| `--color-text-secondary` | `#8888a0` | `text-text-secondary` | 正文内容 |
| `--color-text-tertiary` | `#55556a` | `text-text-tertiary` | 标签、辅助信息 |
| `--color-text-locked` | `#44445a` | `text-text-locked` | 锁定的 "???" 占位 |

### 强调色（CMYK 映射）

| 变量 | 值 | Tailwind 类 | 映射 | 用途 |
|------|-----|------------|------|------|
| `--color-accent-cyan` | `#00cccc` | `text-accent-cyan` | C（理性频道） | 链接、激活状态、主强调 |
| `--color-accent-magenta` | `#cc0066` | `text-accent-magenta` | M（共情频道） | 角色面板 |
| `--color-accent-yellow` | `#cccc00` | `text-accent-yellow` | Y（直觉频道） | 角色面板 |
| `--color-accent-key` | `#333344` | `text-accent-key` | K（阴影频道） | 角色面板、边框 |

### 功能色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-accent-green` | `#00cc66` | 终端绿色、活跃状态 |
| `--color-accent-red` | `#cc3333` | 错误、警告 |

### 边框与效果

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-border-default` | `#2a2a3a` | 默认边框 |
| `--color-border-active` | `#00cccc` | 激活/聚焦边框 |
| `--color-dot-matrix` | `#33334a` | 点阵装饰元素 |
| `--color-scanline` | `rgba(0,0,0,0.08)` | 扫描线覆盖层 |
| `--color-noise` | `rgba(255,255,255,0.02)` | 噪点纹理 |

---

## 字体

通过 `next/font/google` 加载，定义在 `src/lib/fonts.ts`：

| CSS 变量 | 字体 | 权重 | 用途 |
|----------|------|------|------|
| `--font-mono` | Share Tech Mono | 400 | 标题、数据标签、代码块、规则文本 |
| `--font-sans` | Noto Sans SC | 400, 500, 700 | 正文、描述、长文本 |

**使用规则：**
- 所有 `h1-h4` 标题使用 `font-mono`
- 正文和长段落使用 `font-sans`（Noto Sans SC 保证中文可读性）
- 系统标签、终端提示使用 `font-mono` + `tracking-wider` + `uppercase`

---

## 动画

Tailwind 动画令牌定义在 `@theme` 中，关键帧定义在 `globals.css`：

| 动画名 | 持续时间 | 效果 | 使用场景 |
|--------|----------|------|----------|
| `animate-glitch` | 0.3s | 位移 + 色调旋转 | 错误状态、强调交互 |
| `animate-scanline` | 8s, infinite | 垂直扫描带 | CRT 效果覆盖层 |
| `animate-noise` | 0.15s, steps(2), infinite | 透明度闪烁 | 噪点覆盖层 |
| `animate-flicker` | 4s, infinite | 细微透明度波动 (0.96-1.0) | CRT 不稳定效果 |
| `animate-pixel-hover` | 0.1s × 3 | 2px 随机位移 | 按钮/卡片悬停抖动 |
| `animate-fade-in` | 0.4s | 透明度 0→1 | 内容淡入 |
| `animate-slide-up` | 0.4s | 透明度 + translateY 16→0 | 内容上滑进入 |
| `animate-slide-in-right` | 0.3s | 透明度 + translateX 24→0 | 面板滑入 |

### 故障文字动画

CSS 类 `.glitch-text` 使用 `::before` 和 `::after` 伪元素实现 RGB 通道分离：

```css
.glitch-text::before {
  color: var(--color-accent-cyan);
  animation: glitch-shift-1 3s infinite linear alternate-reverse;
}
.glitch-text::after {
  color: var(--color-accent-magenta);
  animation: glitch-shift-2 2.5s infinite linear alternate-reverse;
}
```

95% 时间静止，最后 5% 触发 clip-path + translate 位移，产生间歇性故障效果。

---

## 像素边框

三种尺寸的像素化裁剪边框，通过 `clip-path: polygon(...)` 实现：

| CSS 类 | 切角大小 | 使用场景 |
|--------|----------|----------|
| `.pixel-border-sm` | 2px | 小型元素（筛选按钮、标签） |
| `.pixel-border` | 3px（默认） | 按钮、卡片、面板 |
| `.pixel-border-lg` | 4px | 大型容器 |

**原理：** 在四个角各切掉一个正方形，产生像素化的锯齿边缘。

额外提供 box-shadow 方案的轮廓类：

| CSS 类 | 效果 |
|--------|------|
| `.pixel-outline` | 3px inset box-shadow，颜色 `border-default` |
| `.pixel-outline-active` | 3px inset box-shadow，颜色 `border-active`（青色） |

---

## 点阵装饰

| CSS 类 | 效果 |
|--------|------|
| `.dot-matrix-bg` | 径向渐变点阵背景图案（8px 间距） |

`DotMatrixLine` 组件用作段落分隔线，可调 `dotSize` 和 `gap` props。

---

## 滚动条

自定义滚动条样式在 `globals.css` 中：

- **轨道**：`bg-secondary` 背景
- **滑块**：点阵条纹图案（2px 交替 `dot-matrix` 色 + 透明）
- **滑块悬停**：条纹变为 `accent-cyan`
- **宽度**：8px
- Firefox 兼容：`scrollbar-color` + `scrollbar-width: thin`

---

## MDX 排版样式

`.prose-dg` 类提供 MDX 内容的排版样式：

| 元素 | 样式 |
|------|------|
| h1-h4 | `font-mono`，`text-primary`，各级字号 |
| p | `text-secondary`，行高 1.8 |
| a | `accent-cyan`，下划线，悬停变 `text-primary` |
| code (行内) | `font-mono`，`bg-tertiary`，1px 边框 |
| pre | `bg-secondary`，1px 边框，1rem 内边距 |
| blockquote | 3px `accent-cyan` 左边框，斜体 |
| li::marker | `accent-cyan` |
| th | `bg-tertiary`，`font-mono`，`accent-cyan` 文字 |
| td | `text-secondary` |
| hr | 1px `border-default` |

---

## 响应式断点

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| 默认（移动端） | < 768px | 单列、侧边栏隐藏为抽屉、角色详情为全屏覆盖 |
| `md` | ≥ 768px | 两列布局激活、侧边栏可见、角色列表 + 详情并排 |
| `lg` | ≥ 1024px | 完整桌面布局、画廊网格更多列 |
