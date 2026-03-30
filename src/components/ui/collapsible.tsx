'use client';

import { cn } from '@/lib/utils';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { type ReactNode, useState } from 'react';

interface CollapsibleProps {
  title: string;
  titleTag?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({
  title,
  titleTag,
  children,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen} className={className}>
      <CollapsiblePrimitive.Trigger
        className={cn(
          'flex w-full items-center gap-3 py-3 px-4 text-left font-mono text-sm tracking-wider',
          'text-text-secondary hover:text-text-primary transition-colors duration-150',
          'hover:bg-bg-hover group'
        )}
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 text-accent-cyan shrink-0 transition-transform duration-200',
            open && 'rotate-90'
          )}
        />
        {titleTag && (
          <span className="text-accent-cyan text-xs font-mono opacity-60">
            [{titleTag}]
          </span>
        )}
        <span className="uppercase">{title}</span>
      </CollapsiblePrimitive.Trigger>

      <AnimatePresence initial={false}>
        {open && (
          <CollapsiblePrimitive.Content forceMount asChild>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pl-11">
                {children}
              </div>
            </motion.div>
          </CollapsiblePrimitive.Content>
        )}
      </AnimatePresence>
    </CollapsiblePrimitive.Root>
  );
}
