# 页面路由文档

## 路由总览

| 路径 | 文件 | 渲染方式 | 说明 |
|------|------|----------|------|
| `/` | `src/app/page.tsx` | Server (构建时) | 首页 |
| `/chapters` | `src/app/chapters/page.tsx` | Client | 章节选择器 |
| `/chapters/[slug]` | `src/app/chapters/[slug]/page.tsx` | SSG | 章节详情 |
| `/characters` | `src/app/characters/page.tsx` | Client | 角色数据库 |
| `/lore` | `src/app/lore/page.tsx` | Client | 设定词典 |
| `/rules` | `src/app/rules/page.tsx` | Client | 规则书 |
| `/gallery` | `src/app/gallery/page.tsx` | Client | 画廊 |
| `/gallery/[slug]` | `src/app/gallery/[slug]/page.tsx` | SSG | 文章详情 |
| `/_not-found` | `src/app/not-found.tsx` | Server | 404 页面 |

---

## 首页 `/`

**文件：** `src/app/page.tsx`（Server Component）

**功能：**
- 英雄区域：渐变背景 + 点阵图案 + 故障文字标题 + CTA 按钮
- 文档索引：7 个可折叠段落，从 `content/home/` 加载 MDX
- 段落间使用点阵分隔线

**数据流：**
```
content/home/*.mdx → getContentFiles('home') → renderMDX() → DocumentSection 组件
```

**关键组件：**
- `HeroSection` — 英雄区域
- `DocumentSection` — 折叠段落（包裹 Collapsible）
- `DotMatrixLine` — 分隔线

---

## 章节 `/chapters`

**文件：** `src/app/chapters/page.tsx`（Client Component）

**功能：**
- 4 张纵向卡片横向排列
- 悬停展开显示完整图片和描述
- 点击进入章节详情页

**数据流：**
```
src/data/chapters.ts → ChapterGrid 组件
```

**关键组件：**
- `ChapterGrid` — 包含 ChapterCard 的弹性布局
- `PageTransition` — 页面入场动画

**交互细节：**
- 默认：每张卡片 `flex: 1`
- 悬停：目标卡片 `flex: 3`，500ms CSS transition
- 展开显示：章节编号、标题、副标题、描述、`> ENTER →` 指示器
- 移动端：纵向堆叠

---

## 章节详情 `/chapters/[slug]`

**文件：** `src/app/chapters/[slug]/page.tsx`（SSG）

**功能：**
- 使用 `generateStaticParams()` 预生成 4 个页面
- 显示章节编号、标题、副标题、描述
- 内容区域为「建设中」占位

**数据流：**
```
src/data/chapters.ts → generateStaticParams() → 按 slug 查找章节
```

---

## 角色 `/characters`

**文件：** `src/app/characters/page.tsx`（Client Component）

**功能：**
- NPC / 玩家角色标签页切换
- 左侧：可滚动角色头像列表
- 右侧（桌面）：角色详情面板
- 移动端：点击头像全屏覆盖显示详情

**数据流：**
```
src/data/characters.ts → 按 type 筛选 → CharacterList（左） + CharacterDetail（右）
```

**关键组件：**
- `Tabs` / `TabsContent` — NPC/Player 切换
- `CharacterList` — 头像列表（ScrollArea 包裹）
- `CharacterDetail` — 详情面板
- `CMYKPanel` — 四色人格档案

**状态管理：**
- `activeId: string` — 当前选中角色 ID
- `useMediaQuery('(min-width: 768px)')` — 响应式检测

**响应式行为：**
- `md+`：左右双栏布局
- `< md`：列表占全宽，选中后详情作为固定全屏覆盖层

---

## 设定 `/lore`

**文件：** `src/app/lore/page.tsx`（Client Component）

**功能：**
- DocLayout 双栏：左侧树形菜单 + 右侧内容区
- 按扇区 → 条目两级导航
- 点击叶节点显示对应设定条目
- 锁定条目显示 ACCESS.DENIED + 锁图标

**数据：**
- `loreSectors` — 硬编码扇区和条目结构
- `loreContent` — 硬编码条目内容映射

> 后续迭代将改为从 `content/lore/` 文件系统加载。

**关键组件：**
- `DocLayout` — 双栏布局
- `TreeMenu` — 可折叠树形菜单

**状态：**
- `activeId: string` — 当前选中条目

---

## 规则 `/rules`

**文件：** `src/app/rules/page.tsx`（Client Component）

**功能：**
- DocLayout 双栏：左侧目录 + 右侧内容
- 两个分区：玩家手册（省流版）+ 详细规则书
- 规则条文以等宽字体、代码块样式展示
- 支持锚点滚动跳转

**数据：**
- `rulesData` — 硬编码 quickstart 和 full-rules 数组

> 后续迭代将改为从 `content/rules/` 文件系统加载。

**关键组件：**
- `DocLayout` — 双栏布局
- `SidebarNav` — 目录导航

**交互：**
- 点击侧边栏项 → `scrollIntoView({ behavior: 'smooth' })`
- 每个规则段落有 `id` 属性用于锚点

---

## 画廊 `/gallery`

**文件：** `src/app/gallery/page.tsx`（Client Component）

**功能：**
- 「文」/「画」标签页切换
- 文章标签页：卡片网格，点击进入详情页
- 画作标签页：CSS columns 瀑布流 + 点击灯箱放大
- 章节筛选

**数据：**
- `articles` / `artworks` — 硬编码示例数据

> 后续迭代将改为从 `content/gallery/` 加载。

**关键组件：**
- `Tabs` / `TabsContent` — 文/画切换
- `PixelCard` — 文章卡片
- `FilterBar` — 章节筛选
- `ImageLightbox` — 画作放大

**状态：**
- `chapterFilter: string` — 章节筛选值
- `lightboxSrc: string | null` — 灯箱图片路径

---

## 画廊文章详情 `/gallery/[slug]`

**文件：** `src/app/gallery/[slug]/page.tsx`（SSG Server Component）

**功能：**
- `generateStaticParams()` 从 `content/gallery/articles/` 生成路径
- 读取对应 MDX 文件并编译渲染
- 显示标题、日期、作者、正文
- 返回画廊按钮

**数据流：**
```
content/gallery/articles/{slug}.mdx → getContentFiles() → renderMDX() → 页面渲染
```

---

## 404 页面

**文件：** `src/app/not-found.tsx`

**功能：**
- 故障效果 "404" 大字
- 终端风格错误信息
- 返回首页按钮

---

## SEO 元数据

根布局 `layout.tsx` 定义默认元数据：

```typescript
export const metadata: Metadata = {
  title: {
    default: 'DIGITAL GHOST',
    template: '%s | DIGITAL GHOST',
  },
  description: '数字幽灵 — 一个基于用户生成内容的TRPG企划',
};
```

各页面可通过导出 `metadata` 对象覆盖。
