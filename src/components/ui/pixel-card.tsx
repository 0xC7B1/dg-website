import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  active?: boolean;
}

export const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, hoverable = false, active = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-secondary border border-border-default pixel-border transition-all duration-200',
          hoverable && 'hover:border-border-active hover:bg-bg-tertiary hover:animate-pixel-hover cursor-pointer',
          active && 'border-border-active bg-bg-tertiary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PixelCard.displayName = 'PixelCard';
