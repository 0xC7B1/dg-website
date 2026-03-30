import { cn } from '@/lib/utils';

interface ScanlineOverlayProps {
  className?: string;
  intensity?: 'light' | 'normal' | 'heavy';
}

export function ScanlineOverlay({ className, intensity = 'normal' }: ScanlineOverlayProps) {
  const opacityMap = {
    light: 'opacity-[0.03]',
    normal: 'opacity-[0.06]',
    heavy: 'opacity-[0.12]',
  };

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-[90]',
        opacityMap[intensity],
        className
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0, 0, 0, 0.3) 1px,
          rgba(0, 0, 0, 0.3) 2px
        )`,
      }}
      aria-hidden="true"
    />
  );
}
