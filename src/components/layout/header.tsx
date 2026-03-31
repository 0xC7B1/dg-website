'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { MobileNav } from './mobile-nav';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/chapters', label: '章节' },
  { href: '/characters', label: '角色' },
  { href: '/lore', label: '设定' },
  { href: '/rules', label: '规则' },
  { href: '/gallery', label: '创作' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border-default bg-bg-primary/80 backdrop-blur-md">
        <div className="flex items-center h-full">
          {/* Logo — white block from left edge, right side 15° slant */}
          <Link
            href="/"
            className="flex items-center h-full bg-accent-white pl-6 pr-8 shrink-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 15px) 100%, 0 100%)' }}
          >
            <span className="font-mono text-lg tracking-[0.2em] text-bg-primary">
              DIGITAL_GHOST
            </span>
          </Link>

          {/* Desktop Nav — right aligned, contained */}
          <nav className="hidden md:flex items-center h-full ml-auto pr-6">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex items-center h-full px-4 group',
                    isActive && 'z-10'
                  )}
                >
                  {/* Skewed parallelogram background (15° forward lean) */}
                  <span
                    className={cn(
                      'absolute inset-y-0 inset-x-0 -skew-x-[15deg] transition-all duration-200',
                      isActive
                        ? 'bg-accent-white'
                        : 'bg-transparent group-hover:bg-accent-white/10'
                    )}
                  />
                  <span
                    className={cn(
                      'relative font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-150',
                      isActive
                        ? 'text-bg-primary'
                        : 'text-text-secondary group-hover:text-text-primary'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-auto pr-6 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <MobileNav
        items={navItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
