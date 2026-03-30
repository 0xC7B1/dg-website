'use client';

import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type ReactNode } from 'react';

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultValue, children, className }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue || tabs[0]?.value} className={className}>
      <TabsPrimitive.List className="flex gap-0 border-b border-border-default">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-6 py-3 font-mono text-sm tracking-wider uppercase transition-colors duration-150',
              'text-text-tertiary hover:text-text-primary',
              'border-b-2 border-transparent -mb-[1px]',
              'data-[state=active]:text-accent-cyan data-[state=active]:border-accent-cyan'
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  );
}

export const TabsContent = TabsPrimitive.Content;
