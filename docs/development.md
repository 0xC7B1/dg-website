# 开发指南

## 环境要求

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器默认运行在 `http://localhost:3000`。

---

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（Turbopack 加速） |
| `npm run build` | 构建静态导出到 `out/` 目录 |
| `npm run start` | 启动生产服务器（静态导出模式下无实际用途） |
| `npm run lint` | 运行 ESLint 检查 |

---

## 构建

```bash
npm run build
```

构建产物输出到 `out/` 目录，包含纯 HTML/CSS/JS 文件，可直接部署到任何静态托管服务。

构建完成后可本地预览：

```bash
npx serve out
```

---

## 部署到 Vercel

1. 将项目推送到 Git 仓库（GitHub / GitLab / Bitbucket）
2. 在 [vercel.com](https://vercel.com) 导入项目
3. Vercel 自动检测 Next.js 并配置构建
4. 每次推送自动触发重新部署

**注意：** `next.config.mjs` 中已配置 `output: 'export'`，Vercel 会生成静态站点。`images: { unoptimized: true }` 允许 Vercel 在边缘节点处理图片优化。

---

## 项目结构约定

### 文件命名

- 组件文件：`kebab-case.tsx`（如 `pixel-button.tsx`）
- 类型文件：`kebab-case.ts`（如 `character.ts`）
- 数据文件：`kebab-case.ts`（如 `characters.ts`）
- 内容文件：`kebab-case.mdx`（如 `getting-started.mdx`）

### 导入路径

始终使用 `@/` 路径别名：

```typescript
// ✅ 正确
import { PixelButton } from '@/components/ui/pixel-button';
import { cn } from '@/lib/utils';
import { characters } from '@/data/characters';

// ❌ 避免
import { PixelButton } from '../../../components/ui/pixel-button';
```

### 组件组织

- `components/ui/` — 设计系统原子组件，跨页面复用
- `components/effects/` — 视觉效果，跨页面复用
- `components/layout/` — 布局框架组件
- `components/{page}/` — 页面专用组件

### 客户端 vs 服务端组件

- 需要交互（useState、useEffect、事件处理）的组件标记 `'use client'`
- 仅渲染内容的组件默认为 Server Component（不加 `'use client'`）
- 首页 `page.tsx` 是 Server Component（构建时渲染 MDX）
- 其他页面（chapters/characters/lore/rules/creations）是 Client Component

---

## 添加新页面

1. 在 `src/app/` 下创建目录和 `page.tsx`
2. 如需导航入口，更新 `src/components/layout/header.tsx` 中的 `navItems`
3. 如果页面是客户端组件，添加 `'use client'` 指令并包裹 `PageTransition`
4. 如果页面有动态路由，实现 `generateStaticParams()` 函数

```tsx
// src/app/new-page/page.tsx
'use client';

import { PageTransition } from '@/components/effects/page-transition';

export default function NewPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
          {'>'} PAGE.TITLE // 页面标题
        </p>
        <h1 className="font-mono text-2xl text-text-primary tracking-wider">
          新页面
        </h1>
        {/* 内容 */}
      </div>
    </PageTransition>
  );
}
```

---

## 添加新 UI 组件

1. 在 `src/components/ui/` 创建文件
2. 使用 `cn()` 工具合并类名
3. 使用 `forwardRef` 转发 ref（如果需要）
4. 如果有多个变体，使用 CVA（class-variance-authority）
5. 遵循项目视觉风格：`pixel-border`、`font-mono`、`bg-bg-secondary` 等

---

## 关键库用法

### cn() — 类名合并

```typescript
import { cn } from '@/lib/utils';

// 条件类名
<div className={cn('base-class', isActive && 'active-class', className)} />
```

### Framer Motion — 动画

```tsx
import { motion, AnimatePresence } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  内容
</motion.div>
```

### Radix UI — 无障碍原语

项目使用的 Radix 组件：

| 包 | 用途 | 封装组件 |
|-----|------|----------|
| `@radix-ui/react-collapsible` | 折叠/展开 | `Collapsible` |
| `@radix-ui/react-tabs` | 标签页 | `Tabs` |
| `@radix-ui/react-scroll-area` | 自定义滚动 | `ScrollArea` |

### MDX 内容渲染

```typescript
// 服务端：读取文件 + 编译
import { getContentFiles } from '@/lib/content';
import { renderMDX } from '@/lib/mdx';

const files = getContentFiles('home');      // 读取目录下所有 MDX
const content = await renderMDX(files[0].content);  // 编译为 React 组件
```

---

## 已知限制

1. **设定词典和规则数据硬编码**：当前 `/lore` 和 `/rules` 页面的数据写死在页面文件中，未从 `content/` 目录动态加载。后续需要实现文件系统加载。

2. **创作数据硬编码**：`/creations` 页面的文章和画作列表同样硬编码，需改为从内容文件加载。

3. **图片占位**：所有图片位置使用文字占位符（角色首字母、作品标题），需要替换为实际图片素材。

4. **无实际音效**：`howler` 未安装，终端按键音效为预留功能。

5. **静态锁定**：内容锁定/解锁为纯静态配置，修改后需重新构建部署。

---

## 排错

### 构建失败：Module not found

确保所有导入使用 `@/` 路径别名。数据文件位于 `src/data/`，不是项目根目录的 `data/`。

### 图片不显示

- 静态导出模式下 `next/image` 不提供优化，图片路径指向 `public/` 目录
- 确保图片文件存在于 `public/images/` 对应路径

### MDX 渲染错误

- 确认文件扩展名为 `.mdx`
- 检查 frontmatter 格式（YAML，`---` 分隔符）
- `renderMDX()` 仅在 Server Component 中可用
