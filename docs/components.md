# 组件 API 文档

## 目录

- [UI 原子组件](#ui-原子组件)
- [视觉效果组件](#视觉效果组件)
- [布局组件](#布局组件)
- [页面专用组件](#页面专用组件)

---

## UI 原子组件

所有 UI 原子组件位于 `src/components/ui/`。

### PixelButton

`src/components/ui/pixel-button.tsx`

像素化边框按钮，使用 CVA 管理变体。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'ghost' \| 'outline' \| 'danger'` | `'primary'` | 样式变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `className` | `string` | — | 额外类名 |
| ...rest | `ButtonHTMLAttributes` | — | 原生按钮属性 |

**变体说明：**
- `primary`：青色背景 + 深色文字
- `ghost`：透明背景，悬停显示背景
- `outline`：透明背景 + 青色边框
- `danger`：红色背景

```tsx
<PixelButton variant="primary" size="lg">开始探索</PixelButton>
<PixelButton variant="outline">查看规则</PixelButton>
```

---

### PixelCard

`src/components/ui/pixel-card.tsx`

像素化边框卡片容器。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `hoverable` | `boolean` | `false` | 是否有悬停交互效果 |
| `active` | `boolean` | `false` | 是否为激活状态 |
| `className` | `string` | — | 额外类名 |
| `children` | `ReactNode` | — | 内容 |

```tsx
<PixelCard hoverable className="p-5">
  <h3>卡片标题</h3>
  <p>内容...</p>
</PixelCard>
```

---

### Collapsible

`src/components/ui/collapsible.tsx`

基于 Radix UI 的折叠/展开组件，使用 Framer Motion 动画。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 触发器标题文字 |
| `titleTag` | `string` | — | 标题前的标签（如 `[00]`） |
| `defaultOpen` | `boolean` | `false` | 初始是否展开 |
| `className` | `string` | — | 根元素类名 |
| `children` | `ReactNode` | — | 折叠内容 |

```tsx
<Collapsible title="档案解密" titleTag="01" defaultOpen>
  <p>故事背景内容...</p>
</Collapsible>
```

---

### DotMatrixLine

`src/components/ui/dot-matrix-line.tsx`

点阵装饰分隔线。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dotSize` | `number` | `2` | 点的直径（px） |
| `gap` | `number` | `6` | 点间距（px） |
| `className` | `string` | — | 额外类名 |

```tsx
<DotMatrixLine />
<DotMatrixLine dotSize={3} gap={8} className="my-8" />
```

---

### SidebarNav

`src/components/ui/sidebar-nav.tsx`

侧边栏导航列表，支持层级缩进和锁定状态。

| Prop | 类型 | 说明 |
|------|------|------|
| `items` | `SidebarNavItem[]` | 导航项列表 |
| `activeId` | `string` | 当前激活项 ID |
| `onSelect` | `(id: string) => void` | 点击回调 |
| `className` | `string` | 额外类名 |

**SidebarNavItem：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识 |
| `label` | `string` | 显示文字 |
| `level` | `number?` | 缩进层级（0 起始） |
| `locked` | `boolean?` | 是否锁定（显示 ???） |

---

### TreeMenu

`src/components/ui/tree-menu.tsx`

可嵌套的树形菜单，支持展开/折叠子节点。

| Prop | 类型 | 说明 |
|------|------|------|
| `nodes` | `TreeNode[]` | 树节点数组 |
| `activeId` | `string` | 当前激活叶节点 ID |
| `onSelect` | `(id: string) => void` | 叶节点点击回调 |
| `className` | `string` | 额外类名 |

**TreeNode：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识 |
| `label` | `string` | 显示文字 |
| `locked` | `boolean?` | 锁定状态 |
| `children` | `TreeNode[]?` | 子节点 |

有子节点的节点作为折叠父级，无子节点的作为可选叶节点。

---

### Tabs

`src/components/ui/tabs.tsx`

基于 Radix UI 的标签页组件。

| Prop | 类型 | 说明 |
|------|------|------|
| `tabs` | `{ value: string; label: string }[]` | 标签页定义 |
| `defaultValue` | `string?` | 默认激活标签（默认第一个） |
| `children` | `ReactNode` | 标签页内容（使用 `TabsContent`） |
| `className` | `string` | 额外类名 |

```tsx
import { Tabs, TabsContent } from '@/components/ui/tabs';

<Tabs tabs={[{ value: 'npc', label: 'NPC' }, { value: 'player', label: '玩家' }]}>
  <TabsContent value="npc">NPC 列表</TabsContent>
  <TabsContent value="player">玩家列表</TabsContent>
</Tabs>
```

---

### ImageLightbox

`src/components/ui/image-lightbox.tsx`

图片灯箱模态框，支持 Esc 关闭。

| Prop | 类型 | 说明 |
|------|------|------|
| `src` | `string \| null` | 图片路径（`null` 时隐藏） |
| `alt` | `string?` | 图片描述 |
| `onClose` | `() => void` | 关闭回调 |

```tsx
const [src, setSrc] = useState<string | null>(null);
<ImageLightbox src={src} onClose={() => setSrc(null)} />
```

---

### FilterBar

`src/components/ui/filter-bar.tsx`

筛选按钮组，用于画廊等页面的内容过滤。

| Prop | 类型 | 说明 |
|------|------|------|
| `filters` | `FilterGroup[]` | 筛选组数组 |
| `className` | `string` | 额外类名 |

**FilterGroup：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `label` | `string` | 筛选组标签 |
| `options` | `{ value: string; label: string }[]` | 选项列表 |
| `value` | `string` | 当前选中值 |
| `onChange` | `(value: string) => void` | 选中回调 |

---

### ScrollArea

`src/components/ui/scroll-area.tsx`

基于 Radix UI 的自定义滚动区域，使用点阵风格滚动条。

| Prop | 类型 | 说明 |
|------|------|------|
| `children` | `ReactNode` | 滚动内容 |
| `className` | `string` | 额外类名 |

---

## 视觉效果组件

位于 `src/components/effects/`。

### GlitchText

`src/components/effects/glitch-text.tsx`

故障效果文字，使用 CSS 伪元素实现 RGB 通道偏移。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 文字内容 |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'span' \| 'p'` | `'span'` | 渲染标签 |
| `className` | `string` | — | 额外类名 |

```tsx
<GlitchText text="数字幽灵" as="h1" className="text-5xl" />
```

---

### ScanlineOverlay

`src/components/effects/scanline-overlay.tsx`

CRT 扫描线覆盖层，固定定位、不阻挡交互。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `intensity` | `'light' \| 'normal' \| 'heavy'` | `'normal'` | 扫描线不透明度 |
| `className` | `string` | — | 额外类名 |

在 `layout.tsx` 中以 `intensity="light"` 全局挂载。

---

### NoiseOverlay

`src/components/effects/noise-overlay.tsx`

SVG feTurbulence 噪点覆盖层，带透明度动画。

| Prop | 类型 | 说明 |
|------|------|------|
| `className` | `string` | 额外类名 |

---

### MatrixRain

`src/components/effects/matrix-rain.tsx`

Canvas 实现的数字雨下落效果。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `charSet` | `string` | 日文 + 十六进制字符 | 显示字符集 |
| `speed` | `number` | `33` | 帧间隔（ms） |
| `density` | `number` | `0.6` | 字符密度 (0-1) |
| `className` | `string` | — | 额外类名 |

---

### PageTransition

`src/components/effects/page-transition.tsx`

Framer Motion 页面入场动画（淡入 + 上滑）。

| Prop | 类型 | 说明 |
|------|------|------|
| `children` | `ReactNode` | 页面内容 |
| `className` | `string` | 额外类名 |

所有客户端页面均包裹此组件。

---

## 布局组件

位于 `src/components/layout/`。

### Header

`src/components/layout/header.tsx`

固定顶部导航栏。

- Logo：`DIGITAL_GHOST`，链接至首页
- 桌面端：6 个导航链接，当前页面高亮
- 移动端：汉堡菜单按钮，触发 `MobileNav`
- 高度：`h-14`（3.5rem），背景半透明 + 模糊

---

### Footer

`src/components/layout/footer.tsx`

页脚，包含版权信息和系统状态文字。

---

### MobileNav

`src/components/layout/mobile-nav.tsx`

右侧滑入的移动端导航抽屉。

| Prop | 类型 | 说明 |
|------|------|------|
| `items` | `{ href: string; label: string }[]` | 导航项 |
| `open` | `boolean` | 是否显示 |
| `onClose` | `() => void` | 关闭回调 |

- 幕布点击关闭
- 当前页面项高亮（青色左边框）
- Framer Motion 滑入动画

---

### DocLayout

`src/components/layout/doc-layout.tsx`

双栏布局（侧边栏 + 内容区），被 `/lore` 和 `/rules` 页面共用。

| Prop | 类型 | 说明 |
|------|------|------|
| `sidebar` | `ReactNode` | 侧边栏内容 |
| `children` | `ReactNode` | 主内容区 |
| `sidebarTitle` | `string?` | 侧边栏标题 |
| `className` | `string` | 额外类名 |

- 桌面端：侧边栏 `w-64`，sticky 定位
- 移动端：侧边栏隐藏，左下角浮动按钮切换显示
- 侧边栏切换使用 CSS transform + 遮罩层

---

## 页面专用组件

### HeroSection

`src/components/home/hero-section.tsx`

首页英雄区域：渐变背景 + 点阵图案 + 晕影 + 故障文字标题 + CTA 按钮。

按钮链接：「开始探索」→ `/chapters`，「查看规则」→ `/rules`。

---

### DocumentSection

`src/components/home/document-section.tsx`

首页可折叠文档段落，包裹 Collapsible 组件。

| Prop | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 段落标题 |
| `tag` | `string` | 标签代码 |
| `children` | `ReactNode` | MDX 渲染内容 |
| `defaultOpen` | `boolean?` | 默认展开 |

---

### ChapterGrid

`src/components/chapters/chapter-grid.tsx`

章节选择器，4 张纵向图片卡横向排列，悬停展开。

- 默认每张卡片 `flex: 1`
- 悬停卡片 `flex: 3`（CSS transition 500ms）
- 展开时显示描述文字和 `> ENTER →` 提示
- 移动端改为纵向排列

---

### CharacterList

`src/components/characters/character-list.tsx`

角色头像滚动列表（ScrollArea 包裹）。

| Prop | 类型 | 说明 |
|------|------|------|
| `characters` | `Character[]` | 角色数组 |
| `activeId` | `string` | 当前选中 ID |
| `onSelect` | `(id: string) => void` | 选中回调 |

---

### CharacterDetail

`src/components/characters/character-detail.tsx`

角色详情面板：头像、姓名、标签、基本信息表、身份、介绍、CMYK 面板。

- 未选择角色时显示 `> SELECT.CHARACTER` 提示
- Framer Motion 动画切换角色

---

### CMYKPanel

`src/components/characters/cmyk-panel.tsx`

CMYK 四色人格档案网格。

- 2×2 网格布局
- 每个频道有独立颜色（C=青、M=品红、Y=黄、K=灰）
- 已解锁频道可点击展开查看内容
- 未解锁频道显示 `???` + 锁图标
