'use client';

import { useState } from 'react';
import { characters } from '@/data/characters';
import { CharacterList } from '@/components/characters/character-list';
import { CharacterDetail } from '@/components/characters/character-detail';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PageTransition } from '@/components/effects/page-transition';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

const tabs = [
  { value: 'npc', label: 'NPC' },
  { value: 'player', label: '玩家角色' },
];

export default function CharactersPage() {
  const [activeId, setActiveId] = useState<string>('');
  const [activeType, setActiveType] = useState<'npc' | 'player'>('npc');
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const filtered = characters.filter((c) => c.type === activeType);
  const activeCharacter = characters.find((c) => c.id === activeId) || null;

  const showMobileDetail = !isDesktop && activeCharacter;

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
            {'>'} PERSONNEL.DATABASE // 人员数据库
          </p>
          <h1 className="font-mono text-2xl text-text-primary tracking-wider">角色</h1>
        </div>

        <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
          {/* Left: Character list */}
          <div className="w-full md:w-72 shrink-0 border border-border-default bg-bg-secondary">
            <Tabs
              tabs={tabs}
              defaultValue="npc"
            >
              <TabsContent value="npc" className="p-0">
                <CharacterList
                  characters={characters.filter((c) => c.type === 'npc')}
                  activeId={activeId}
                  onSelect={setActiveId}
                  className="h-[60vh]"
                />
              </TabsContent>
              <TabsContent value="player" className="p-0">
                <CharacterList
                  characters={characters.filter((c) => c.type === 'player')}
                  activeId={activeId}
                  onSelect={setActiveId}
                  className="h-[60vh]"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Character detail (desktop) */}
          <div className="hidden md:block flex-1 border border-border-default bg-bg-secondary">
            <CharacterDetail character={activeCharacter} className="h-[calc(100vh-12rem)]" />
          </div>
        </div>

        {/* Mobile detail overlay */}
        {showMobileDetail && (
          <div className="fixed inset-0 z-50 bg-bg-primary md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-border-default">
              <h2 className="font-mono text-sm text-accent-cyan tracking-wider">
                {activeCharacter.name}
              </h2>
              <button
                onClick={() => setActiveId('')}
                className="text-text-secondary hover:text-text-primary"
                aria-label="关闭"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CharacterDetail character={activeCharacter} className="h-[calc(100vh-3.5rem)]" />
          </div>
        )}
      </div>
    </PageTransition>
  );
}
