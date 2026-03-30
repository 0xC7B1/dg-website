import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-mono text-sm tracking-wider uppercase transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none pixel-border',
  {
    variants: {
      variant: {
        primary:
          'bg-accent-cyan text-bg-primary hover:bg-accent-cyan/80 hover:animate-pixel-hover',
        ghost:
          'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover hover:animate-pixel-hover',
        outline:
          'bg-transparent text-accent-cyan border border-border-default hover:border-border-active hover:animate-pixel-hover',
        danger:
          'bg-accent-red text-bg-primary hover:bg-accent-red/80 hover:animate-pixel-hover',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface PixelButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

PixelButton.displayName = 'PixelButton';
