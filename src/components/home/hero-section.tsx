import { cn } from '@/lib/utils';
import { GlitchText } from '@/components/effects/glitch-text';
import { PixelButton } from '@/components/ui/pixel-button';
import Link from 'next/link';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative min-h-[80vh] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background gradient + dot matrix pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
      <div className="absolute inset-0 dot-matrix-bg opacity-20" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg-primary)_70%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Terminal prefix */}
        <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-6 animate-fade-in">
          {'>'} SYSTEM.BOOT // DIGITAL_GHOST v1.0
        </p>

        {/* Title */}
        <GlitchText
          text="数字幽灵"
          as="h1"
          className="text-5xl md:text-7xl font-bold tracking-[0.15em] text-text-primary mb-4"
        />

        {/* Subtitle */}
        <p className="font-mono text-lg md:text-xl text-accent-cyan tracking-[0.1em] mb-2 animate-fade-in"
           style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          DIGITAL GHOST
        </p>

        {/* Description */}
        <p className="text-text-secondary text-base md:text-lg mt-6 mb-10 leading-relaxed animate-slide-up"
           style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
          一个基于用户生成内容的TRPG企划
          <br />
          <span className="text-text-tertiary text-sm">
            在数据噪声中寻找真相，在信号干扰中书写故事
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-slide-up"
             style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          <Link href="/chapters">
            <PixelButton variant="primary" size="lg">
              开始探索
            </PixelButton>
          </Link>
          <Link href="/rules">
            <PixelButton variant="outline" size="lg">
              查看规则
            </PixelButton>
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
