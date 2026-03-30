'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface MobileNavProps {
  items: { href: string; label: string }[];
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ items, open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-secondary border-l border-border-default"
          >
            <div className="flex items-center justify-between p-6 border-b border-border-default">
              <span className="font-mono text-sm text-accent-cyan tracking-wider">
                MENU
              </span>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="关闭菜单"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-1">
              {items.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'px-4 py-3 font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-150 border-l-2',
                      isActive
                        ? 'border-accent-cyan text-accent-cyan bg-bg-hover'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-mono text-xs text-text-locked tracking-wider text-center">
                // SYS.NAV.v1.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
