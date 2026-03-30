# 项目架构

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | ^16.2.1 | React 框架，静态导出 |
| React | ^19.2.4 | UI 库 |
| TypeScript | ^6.0.2 | 类型安全 |
| Tailwind CSS | ^4.2.2 | 样式系统 |
| Framer Motion | ^12.38.0 | 动画 |
| Radix UI | latest | 无障碍 UI 原语（Collapsible / Tabs / ScrollArea） |
| next-mdx-remote | ^6.0.0 | MDX 内容渲染 |
| gray-matter | ^4.0.3 | YAML frontmatter 解析 |
| Lucide React | ^1.7.0 | 图标库 |
| CVA | ^0.7.1 | 组件变体系统 |

## 构建模式

项目配置为 **静态导出**（`output: 'export'`），构建产物为纯 HTML/CSS/JS，无需服务器运行时。

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

## 目录结构

```
dg-website/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx          # 根布局（字体、导航、页脚、扫描线）
│   │   ├── page.tsx            # 首页 /
│   │   ├── not-found.tsx       # 404 页面
│   │   ├── globals.css         # 全局样式、设计令牌、关键帧
│   │   ├── chapters/           # /chapters、/chapters/[slug]
│   │   ├── characters/         # /characters
│   │   ├── lore/               # /lore
│   │   ├── rules/              # /rules
│   │   └── gallery/            # /gallery、/gallery/[slug]
│   │
│   ├── components/
│   │   ├── ui/                 # 设计系统原子组件（10 个）
│   │   ├── effects/            # 视觉效果组件（5 个）
│   │   ├── layout/             # 布局组件（4 个）
│   │   ├── home/               # 首页专用组件
│   │   ├── chapters/           # 章节页专用组件
│   │   ├── characters/         # 角色页专用组件
│   │   ├── lore/               # （预留）
│   │   ├── rules/              # （预留）
│   │   └── gallery/            # （预留）
│   │
│   ├── lib/                    # 工具函数
│   │   ├── fonts.ts            # next/font 字体配置
│   │   ├── utils.ts            # cn() 类名合并工具
│   │   ├── content.ts          # 文件系统内容加载
│   │   └── mdx.ts              # MDX 编译管线
│   │
│   ├── hooks/                  # React 自定义 Hook
│   │   ├── use-active-section.ts   # IntersectionObserver 滚动追踪
│   │   └── use-media-query.ts      # 响应式断点检测
│   │
│   ├── types/                  # TypeScript 类型定义
│   │   ├── character.ts
│   │   ├── chapter.ts
│   │   ├── gallery.ts
│   │   ├── lore.ts
│   │   └── rules.ts
│   │
│   └── data/                   # 静态数据（构建时加载）
│       ├── characters.ts
│       ├── chapters.ts
│       └── navigation.ts
│
├── content/                    # MDX / JSON 内容文件
│   ├── home/                   # 7 个首页折叠段落
│   ├── lore/                   # 按扇区分组的设定词典
│   │   └── sector-N/           # _meta.json + entry.mdx
│   ├── rules/                  # quickstart/ + full-rules/
│   └── gallery/
│       ├── articles/           # 文章 MDX
│       └── artworks/           # _index.json 画作元数据
│
└── public/                     # 静态资源
    ├── images/
    │   ├── hero/
    │   ├── chapters/
    │   ├── characters/{avatars,portraits}/
    │   ├── gallery/
    │   └── ui/                 # 噪点纹理等 UI 素材
    └── audio/                  # 可选：终端按键音效
```

## 路径别名

`@/*` 映射到 `./src/*`，在 `tsconfig.json` 中配置：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

所有内部导入使用 `@/` 前缀，例如：
- `@/components/ui/pixel-button`
- `@/lib/utils`
- `@/data/characters`
- `@/types/character`

## 渲染策略

| 页面 | 渲染方式 | 说明 |
|------|----------|------|
| `/` | 服务端（构建时） | 从 content/home/ 读取 MDX 并编译 |
| `/chapters` | 客户端 | 从 data/chapters.ts 读取数据 |
| `/chapters/[slug]` | 静态生成 (SSG) | `generateStaticParams()` 预生成 4 个页面 |
| `/characters` | 客户端 | 交互式面板切换 |
| `/lore` | 客户端 | 单页应用，内容在客户端切换 |
| `/rules` | 客户端 | 单页应用，滚动与锚点导航 |
| `/gallery` | 客户端 | 标签页切换 + 筛选 |
| `/gallery/[slug]` | 静态生成 (SSG) | `generateStaticParams()` 预生成文章详情 |

## 内容管线

```
content/*.mdx  →  gray-matter (提取 frontmatter)  →  next-mdx-remote (编译 MDX)  →  React 组件
                                                       ├── remark-gfm (表格、删除线等)
                                                       ├── rehype-slug (标题自动 ID)
                                                       └── rehype-autolink-headings (标题链接)
```
