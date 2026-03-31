# 内容管理指南

本项目所有内容以 MDX（Markdown + JSX）文件存储在 `content/` 目录中，构建时由 Next.js 读取并编译为静态 HTML。

---

## 目录结构

```
content/
├── home/                       # 首页折叠段落
│   ├── 00-intro.mdx
│   ├── 01-background.mdx
│   ├── 02-stage.mdx
│   ├── 03-characters.mdx
│   ├── 04-experience.mdx
│   ├── 05-timeline.mdx
│   └── 06-notice.mdx
│
├── lore/                       # 设定词典
│   ├── sector-1/               # 扇区 1
│   │   ├── _meta.json          # 扇区元数据（标题、条目列表、解锁状态）
│   │   ├── great-fracture.mdx
│   │   └── grey-mountain.mdx
│   └── sector-2/
│       └── _meta.json
│
├── rules/                      # 规则书
│   ├── quickstart/             # 省流版
│   │   ├── getting-started.mdx
│   │   ├── core-mechanics.mdx
│   │   └── glossary.mdx
│   └── full-rules/             # 完整版
│       └── character-creation.mdx
│
└── creations/                    # 创作
    ├── writing/                # 文字创作
    │   └── first-impression.mdx
    └── visual/                 # 视觉创作
        └── _index.json         # 画作元数据
```

---

## Frontmatter 规范

每个 MDX 文件以 YAML frontmatter 开头，用 `---` 分隔。

### 首页段落

```yaml
---
title: "旅途切片"       # 段落标题
tag: "00"              # 标签代码（显示为 [00]）
order: 0               # 排序权重（升序）
---
```

**文件命名约定：** `{order}-{slug}.mdx`，如 `00-intro.mdx`。

### 设定词典条目

```yaml
---
title: "大断裂"         # 条目标题
order: 1               # 扇区内排序
---
```

### 规则书章节

```yaml
---
title: "快速上手"       # 章节标题
category: "quickstart"  # 分类：quickstart | full-rules
order: 1               # 分类内排序
---
```

### 画廊文章

```yaml
---
title: "灰山城初印象"    # 文章标题
author: "作者名"        # 作者
date: "2026-01-15"     # 发布日期（ISO 格式）
summary: "第一次踏入灰山城时的所见所闻所感。"  # 摘要
chapter: "chapter-1"   # 所属章节（可选，用于筛选）
player: "player-a"     # 所属玩家（可选，用于筛选）
order: 1               # 排序
---
```

---

## 添加新内容

### 添加首页段落

1. 在 `content/home/` 创建新文件，如 `07-new-section.mdx`
2. 设置 frontmatter（title、tag、order）
3. 编写 Markdown 内容
4. 重新构建，自动按 `order` 排列

### 添加设定词典条目

1. 在对应扇区目录创建 MDX 文件，如 `content/lore/sector-1/new-entry.mdx`
2. 更新同目录下的 `_meta.json`，在 `entries` 数组中添加条目：

```json
{
  "slug": "new-entry",
  "title": "新条目标题",
  "unlocked": true
}
```

3. 设置 `unlocked: false` 可将条目标记为锁定状态（显示 ???）

> **注意：** 当前版本中，设定词典的数据在 `src/app/lore/page.tsx` 中硬编码。添加新条目需要同步更新该文件中的 `loreSectors` 和 `loreContent` 对象。后续迭代将改为从文件系统自动加载。

### 添加规则书章节

1. 在 `content/rules/quickstart/` 或 `content/rules/full-rules/` 创建 MDX 文件
2. 设置 frontmatter（title、category、order）

> **注意：** 与设定词典类似，当前规则数据硬编码在 `src/app/rules/page.tsx` 中，需同步更新。

### 添加创作文章

1. 在 `content/creations/writing/` 创建 MDX 文件
2. 设置完整 frontmatter
3. 同时更新 `src/app/creations/page.tsx` 中的 `articles` 数组

### 添加创作画作

编辑 `content/creations/visual/_index.json`，添加新条目：

```json
{
  "id": "art-003",
  "title": "作品标题",
  "author": "画师名",
  "date": "2026-03-01",
  "image": "/images/creations/filename.png",
  "thumbnail": "/images/creations/filename-thumb.png",
  "chapter": "chapter-1",
  "width": 1920,
  "height": 1080
}
```

将图片文件放入 `public/images/creations/`。

---

## 添加新扇区

1. 创建目录 `content/lore/sector-N/`
2. 创建 `_meta.json`：

```json
{
  "title": "第N扇区：扇区标题",
  "order": 3,
  "entries": [
    { "slug": "entry-slug", "title": "条目标题", "unlocked": true }
  ]
}
```

3. 创建对应的 MDX 文件
4. 更新 `src/app/lore/page.tsx` 中的 `loreSectors` 数组

---

## 添加新章节

编辑 `src/data/chapters.ts`，在数组中添加：

```typescript
{
  id: 'chapter-5',
  slug: 'chapter-5',
  number: 5,
  title: '第五章',
  subtitle: '章节副标题',
  thumbnail: '/images/chapters/ch5-thumb.png',
  fullImage: '/images/chapters/ch5-full.png',
  description: '章节描述...',
}
```

将缩略图放入 `public/images/chapters/`。

---

## 添加新角色

编辑 `src/data/characters.ts`，在数组中添加新的 `Character` 对象。参照现有角色结构填写所有字段。

将头像放入 `public/images/characters/avatars/`，立绘放入 `public/images/characters/portraits/`。

---

## MDX 支持的 Markdown 语法

项目使用 `remark-gfm` 插件，支持：

- **标准 Markdown**：标题、段落、列表、链接、图片、粗体/斜体、代码块
- **GFM 扩展**：表格、删除线、任务列表
- **自动标题锚点**：通过 `rehype-slug` + `rehype-autolink-headings`

```markdown
## 这是标题        → 自动生成 id="这是标题" 和锚点链接

| 列1 | 列2 |      → GFM 表格
|-----|-----|
| a   | b   |

~~删除线文字~~     → 删除线

- [x] 已完成       → 任务列表
- [ ] 未完成
```

---

## 锁定内容

项目使用**视觉锁定**机制——没有实际的认证或后端逻辑，仅通过静态数据控制内容的可见性。

- **角色人格档案**：在 `characters.ts` 中设置 `personality.{c,m,y,k}.unlocked`
- **设定词典条目**：在 `_meta.json` 中设置 `unlocked`
- **解锁内容**：修改数据文件中的 `unlocked: false` → `true`，重新构建

未解锁内容统一显示为 `???` 占位文字。
