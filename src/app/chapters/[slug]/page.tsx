import { chapters } from '@/data/chapters';
import { PageTransition } from '@/components/effects/page-transition';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import Link from 'next/link';
import { PixelButton } from '@/components/ui/pixel-button';

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.slug }));
}

export default async function ChapterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = chapters.find((ch) => ch.slug === slug);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="font-mono text-text-tertiary">CHAPTER.NOT_FOUND</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-4">
          CHAPTER.{String(chapter.number).padStart(2, '0')}
        </p>
        <h1 className="font-mono text-3xl text-text-primary tracking-wider mb-2">
          {chapter.title}
        </h1>
        {chapter.subtitle && (
          <p className="font-mono text-lg text-text-secondary mb-6">{chapter.subtitle}</p>
        )}

        <DotMatrixLine className="mx-auto max-w-xs mb-8" />

        <p className="text-text-secondary leading-relaxed mb-8">{chapter.description}</p>

        <div className="border border-border-default pixel-border bg-bg-secondary p-8">
          <p className="font-mono text-sm text-text-tertiary tracking-wider mb-4">
            {'>'} CONTENT.STATUS: PENDING
          </p>
          <p className="text-text-locked text-sm">
            章节详情页面正在建设中...
          </p>
        </div>

        <Link href="/chapters" className="inline-block mt-8">
          <PixelButton variant="ghost">← 返回章节列表</PixelButton>
        </Link>
      </div>
    </PageTransition>
  );
}
