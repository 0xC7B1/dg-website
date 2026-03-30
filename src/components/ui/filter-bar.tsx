'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  className?: string;
}

export function FilterBar({ filters, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap gap-4 items-center', className)}>
      {filters.map((filter) => (
        <div key={filter.label} className="flex items-center gap-2">
          <span className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
            {filter.label}:
          </span>
          <div className="flex gap-1">
            {filter.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => filter.onChange(opt.value)}
                className={cn(
                  'px-3 py-1 text-xs font-mono transition-colors duration-150 pixel-border-sm',
                  filter.value === opt.value
                    ? 'bg-accent-cyan text-bg-primary'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
