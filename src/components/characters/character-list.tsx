'use client';

import { cn } from '@/lib/utils';
import type { Character } from '@/types/character';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AvatarCardProps {
  character: Character;
  active: boolean;
  onClick: () => void;
}

function AvatarCard({ character, active, onClick }: AvatarCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2.5 text-left transition-all duration-150 border-l-2',
        active
          ? 'border-accent-cyan bg-bg-hover text-text-primary'
          : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
      )}
    >
      {/* Avatar placeholder */}
      <div
        className={cn(
          'w-10 h-10 shrink-0 pixel-border bg-bg-tertiary flex items-center justify-center font-mono text-xs',
          active ? 'text-accent-cyan' : 'text-text-tertiary'
        )}
      >
        {character.name[0]}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-sm truncate">{character.name}</p>
        <p className="text-xs text-text-tertiary truncate">{character.tagline}</p>
      </div>
    </button>
  );
}

interface CharacterListProps {
  characters: Character[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function CharacterList({ characters, activeId, onSelect, className }: CharacterListProps) {
  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="flex flex-col">
        {characters.map((char) => (
          <AvatarCard
            key={char.id}
            character={char}
            active={activeId === char.id}
            onClick={() => onSelect(char.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
