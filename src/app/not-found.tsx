import { GlitchText } from '@/components/effects/glitch-text';
import { PixelButton } from '@/components/ui/pixel-button';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-6">
        {'>'} ERROR.404 // PAGE_NOT_FOUND
      </p>

      <GlitchText
        text="404"
        as="h1"
        className="text-7xl font-bold text-text-primary tracking-[0.2em] mb-4"
      />

      <p className="text-text-secondary mb-2">目标页面不存在或已被删除</p>
      <p className="font-mono text-xs text-text-locked mb-8">
        // SIGNAL.LOST — TARGET.UNREACHABLE
      </p>

      <DotMatrixLine className="max-w-xs mb-8" />

      <Link href="/">
        <PixelButton variant="primary">返回首页</PixelButton>
      </Link>
    </div>
  );
}
