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
  { href: '/gallery', label: '画廊' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-default bg-bg-primary/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-lg tracking-[0.2em] text-accent-cyan hover:animate-glitch transition-colors"
          >
            DIGITAL_GHOST
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
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
                    'px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-150',
                    isActive
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
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
