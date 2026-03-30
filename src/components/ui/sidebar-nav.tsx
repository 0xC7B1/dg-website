'use client';

import { cn } from '@/lib/utils';

interface SidebarNavItem {
  id: string;
  label: string;
  level?: number;
  locked?: boolean;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function SidebarNav({ items, activeId, onSelect, className }: SidebarNavProps) {
  return (
    <nav className={cn('flex flex-col gap-0.5', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => !item.locked && onSelect(item.id)}
          disabled={item.locked}
          className={cn(
            'text-left px-3 py-2 text-sm font-mono transition-colors duration-150 border-l-2',
            item.level && item.level > 0 && `pl-${3 + item.level * 3}`,
            activeId === item.id
              ? 'border-accent-cyan text-accent-cyan bg-bg-hover'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover',
            item.locked && 'text-text-locked cursor-not-allowed opacity-50'
          )}
        >
          {item.locked ? '???' : item.label}
        </button>
      ))}
    </nav>
  );
}
