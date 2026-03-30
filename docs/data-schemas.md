# 数据类型与数据文件规范

## 类型定义

所有类型定义位于 `src/types/`。

---

### Character

`src/types/character.ts`

```typescript
interface Character {
  id: string;              // 唯一标识，如 "npc-001"
  slug: string;            // URL 友好标识，如 "lin-ye"
  name: string;            // 角色名
  type: 'npc' | 'player';  // 角色类型
  avatar: string;          // 头像图片路径（/images/characters/avatars/）
  portrait: string;        // 立绘图片路径（/images/characters/portraits/）
  tagline: string;         // 一句话身份标签，如 "灰山城计划发起人"
  summary: string;         // 一句话简介
  chapter: string;         // 所属章节 ID，如 "chapter-1"
  info: Record<string, string>;  // 基本信息键值对（年龄、职业等）
  identity: string;        // 在故事中的角色/身份
  description: string;     // 详细角色介绍
  personality: {
    c: PersonalityChannel;  // Cyan — 理性频道
    m: PersonalityChannel;  // Magenta — 共情频道
    y: PersonalityChannel;  // Yellow — 直觉频道
    k: PersonalityChannel;  // Key(Black) — 阴影频道
  };
}

interface PersonalityChannel {
  label: string;           // 频道名称，如 "理性频道"
  unlocked: boolean;       // 是否已解锁
  content: string;         // 频道内容（未解锁时前端不显示）
}
```

**CMYK 人格系统说明：**

每个角色有四个人格频道，对应 CMYK 色彩模型。频道初始锁定，随章节进展解锁。未解锁频道显示 `???`，已解锁频道可点击查看内容。

---

### Chapter

`src/types/chapter.ts`

```typescript
interface Chapter {
  id: string;              // "chapter-1"
  slug: string;            // "chapter-1"（URL 路径参数）
  number: number;          // 1-4
  title: string;           // "第一章"
  subtitle?: string;       // "灰山城"（可选）
  thumbnail: string;       // 缩略图路径（纵向裁剪）
  fullImage: string;       // 完整图路径（悬停展开时显示）
  description: string;     // 章节简述
}
```

---

### LoreSector / LoreEntry

`src/types/lore.ts`

```typescript
interface LoreSector {
  id: string;              // "sector-1"
  slug: string;            // "sector-1"
  title: string;           // "第一扇区：基础设定"
  chapter: number;         // 关联章节序号
  entries: LoreEntry[];    // 条目列表
}

interface LoreEntry {
  id: string;              // "great-fracture"
  slug: string;            // "great-fracture"
  title: string;           // "大断裂"
  unlocked: boolean;       // 是否可见
  content?: string;        // MDX 内容（运行时填充）
  children?: LoreEntry[];  // 子条目（三级结构）
}
```

---

### RulesSection

`src/types/rules.ts`

```typescript
interface RulesSection {
  id: string;              // "getting-started"
  slug: string;            // "getting-started"
  title: string;           // "快速上手"
  category: 'quickstart' | 'full-rules';  // 所属分类
  order: number;           // 排序权重
  content?: string;        // 内容（运行时填充）
}
```

---

### Article / Artwork

`src/types/gallery.ts`

```typescript
interface Article {
  slug: string;            // "first-impression"（URL 路径参数）
  title: string;           // "灰山城初印象"
  author: string;          // "作者名"
  date: string;            // ISO 日期 "2026-01-15"
  summary: string;         // 摘要
  coverImage?: string;     // 封面图（可选）
  chapter?: string;        // 所属章节（用于筛选）
  player?: string;         // 所属玩家（用于筛选）
  content?: string;        // MDX 内容
}

interface Artwork {
  id: string;              // "art-001"
  title: string;           // "灰山城全景"
  author: string;          // "画师名"
  date: string;            // ISO 日期
  image: string;           // 原图路径
  thumbnail: string;       // 缩略图路径
  chapter?: string;        // 所属章节
  player?: string;         // 所属玩家
  width: number;           // 原图宽度（用于瀑布流宽高比）
  height: number;          // 原图高度
}
```

---

## 数据文件

所有数据文件位于 `src/data/`。

### characters.ts

导出 `characters: Character[]` 数组。当前包含 3 个示例角色：

| ID | 名字 | 类型 | 解锁频道 |
|----|------|------|----------|
| npc-001 | 林叶 | NPC | C |
| npc-002 | 许辰 | NPC | C, M |
| player-001 | 玩家角色A | Player | 无 |

### chapters.ts

导出 `chapters: Chapter[]` 数组。当前包含 4 个章节：

| 序号 | 标题 | 副标题 |
|------|------|--------|
| 1 | 第一章 | 灰山城 |
| 2 | 第二章 | 信号干扰 |
| 3 | 第三章 | 现实溢出 |
| 4 | 第四章 | 终端协议 |

### navigation.ts

导出 `navigation.main` 数组，定义顶部导航栏链接：

```typescript
[
  { href: '/', label: '首页' },
  { href: '/chapters', label: '章节' },
  { href: '/characters', label: '角色' },
  { href: '/lore', label: '设定' },
  { href: '/rules', label: '规则' },
  { href: '/gallery', label: '画廊' },
]
```

---

## JSON 数据文件

### content/lore/sector-N/_meta.json

```json
{
  "title": "第一扇区：基础设定",
  "order": 1,
  "entries": [
    { "slug": "great-fracture", "title": "大断裂", "unlocked": true },
    { "slug": "grey-mountain", "title": "灰山城", "unlocked": true },
    { "slug": "reality-overflow", "title": "现实溢出", "unlocked": false }
  ]
}
```

### content/gallery/artworks/_index.json

```json
[
  {
    "id": "art-001",
    "title": "灰山城全景",
    "author": "示例画师",
    "date": "2026-01-20",
    "image": "/images/gallery/grey-mountain-panorama.png",
    "thumbnail": "/images/gallery/grey-mountain-panorama.png",
    "chapter": "chapter-1",
    "width": 1920,
    "height": 1080
  }
]
```

---

## 图片资源路径约定

| 类型 | 路径 | 格式建议 |
|------|------|----------|
| 英雄横幅 | `/images/hero/` | 1920×1080 PNG/WebP |
| 章节缩略图 | `/images/chapters/ch{N}-thumb.png` | 纵向比例 |
| 章节全图 | `/images/chapters/ch{N}-full.png` | 16:9 或更宽 |
| 角色头像 | `/images/characters/avatars/{slug}.png` | 正方形，≥ 80×80 |
| 角色立绘 | `/images/characters/portraits/{slug}.png` | 3:4 比例 |
| 画廊画作 | `/images/gallery/{filename}.png` | 任意尺寸，需在 JSON 中声明 width/height |
| UI 素材 | `/images/ui/` | 噪点纹理、扫描线等 |
