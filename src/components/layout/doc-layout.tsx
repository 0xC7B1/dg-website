'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface DocLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  sidebarTitle?: string;
  className?: string;
}

export function DocLayout({ sidebar, children, sidebarTitle, className }: DocLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn('flex min-h-[calc(100vh-3.5rem)]', className)}>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 z-40 md:hidden bg-accent-cyan text-bg-primary p-3 pixel-border shadow-lg"
        aria-label="切换侧边栏"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:sticky top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 border-r border-border-default bg-bg-secondary overflow-y-auto shrink-0',
          'transition-transform duration-200 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarTitle && (
          <div className="px-4 py-3 border-b border-border-default">
            <h2 className="font-mono text-xs text-accent-cyan tracking-[0.2em] uppercase">
              {sidebarTitle}
            </h2>
          </div>
        )}
        <div className="p-2">
          {sidebar}
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-bg-primary/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="flex-1 min-w-0 px-6 md:px-10 py-8">
        {children}
      </main>
    </div>
  );
}
