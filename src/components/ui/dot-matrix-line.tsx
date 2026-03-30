import { cn } from '@/lib/utils';

interface DotMatrixLineProps {
  className?: string;
  dotSize?: number;
  gap?: number;
}

export function DotMatrixLine({ className, dotSize = 2, gap = 6 }: DotMatrixLineProps) {
  return (
    <div
      className={cn('w-full h-[2px] opacity-40', className)}
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-matrix) ${dotSize * 0.5}px, transparent ${dotSize * 0.5}px)`,
        backgroundSize: `${gap}px ${dotSize}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
        height: `${dotSize}px`,
      }}
    />
  );
}
