'use client';

import { useState } from 'react';
import { DocLayout } from '@/components/layout/doc-layout';
import { TreeMenu, type TreeNode } from '@/components/ui/tree-menu';
import { PageTransition } from '@/components/effects/page-transition';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lore data structure — in a real app this would come from content files at build time
// For now, inline data matching our content/lore structure
const loreSectors: { id: string; title: string; nodes: TreeNode[] }[] = [
  {
    id: 'sector-1',
    title: '第一扇区：基础设定',
    nodes: [
      { id: 'great-fracture', label: '大断裂' },
      { id: 'grey-mountain', label: '灰山城' },
      { id: 'reality-overflow', label: '现实溢出', locked: true },
      { id: 'grand-future-computer', label: '大未来电脑', locked: true },
    ],
  },
  {
    id: 'sector-2',
    title: '第二扇区：组织与势力',
    nodes: [
      { id: 'management-bureau', label: '管理局', locked: true },
      { id: 'data-miners', label: '数据矿工', locked: true },
    ],
  },
];

// Lore content mapping — in production this comes from MDX at build time
const loreContent: Record<string, { title: string; content: string }> = {
  'great-fracture': {
    title: '大断裂',
    content: `大断裂是发生在重建纪元前夕的一场全球性灾难。在那一天，全球互联网基础设施在数小时内连续崩溃，超过90%的数字数据永久丢失。

至今没有确切的解释。主流理论包括太阳风暴说、人为攻击说和系统崩溃说。

大断裂后的世界与之前截然不同。通信断绝、数据丢失、供应链崩溃。人类社会被迫回到一种半离线的状态，而这正是灰山城计划诞生的背景。`,
  },
  'grey-mountain': {
    title: '灰山城',
    content: `灰山城是建立在旧世界废弃数据中心之上的新兴城市。它是重建纪元中最重要的人类聚居地之一。

灰山城坐落在一片被遗弃的山区，周围环绕着废弃的服务器农场。城市分为多个扇区，每个扇区承担不同的功能。

城市由"管理局"统一管辖，但实际上各扇区有着高度的自治权。地上是官方认可的社区，地下则是数据黑市和信息走私商的天堂。`,
  },
};

export default function LorePage() {
  const [activeId, setActiveId] = useState('great-fracture');

  const activeEntry = loreContent[activeId];

  const treeNodes: TreeNode[] = loreSectors.map((sector) => ({
    id: sector.id,
    label: sector.title,
    children: sector.nodes,
  }));

  return (
    <PageTransition>
      <DocLayout
        sidebarTitle="设定词典"
        sidebar={
          <TreeMenu
            nodes={treeNodes}
            activeId={activeId}
            onSelect={setActiveId}
          />
        }
      >
        <div className="max-w-3xl">
          {/* Page header */}
          <div className="mb-8">
            <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
              {'>'} LORE.DATABASE // 设定词典
            </p>
          </div>

          {activeEntry ? (
            <div className="animate-fade-in">
              <h2 className="font-mono text-xl text-text-primary tracking-wider mb-4">
                {activeEntry.title}
              </h2>
              <DotMatrixLine className="mb-6" />
              <div className="prose-dg">
                {activeEntry.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-text-secondary text-sm leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Lock className="h-8 w-8 text-text-locked mb-4" />
              <p className="font-mono text-sm text-text-locked tracking-wider">
                {'>'} ACCESS.DENIED // 内容未解锁
              </p>
              <p className="text-text-tertiary text-xs mt-2">
                此条目将在后续章节中解锁
              </p>
            </div>
          )}
        </div>
      </DocLayout>
    </PageTransition>
  );
}
