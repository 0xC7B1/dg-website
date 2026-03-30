'use client';

import { chapters } from '@/data/chapters';
import { ChapterGrid } from '@/components/chapters/chapter-grid';
import { PageTransition } from '@/components/effects/page-transition';

export default function ChaptersPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
            {'>'} CHAPTER.SELECT // 章节选择
          </p>
          <h1 className="font-mono text-2xl text-text-primary tracking-wider">章节</h1>
        </div>

        <ChapterGrid chapters={chapters} />
      </div>
    </PageTransition>
  );
}
