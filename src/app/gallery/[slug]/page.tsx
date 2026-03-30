import { getContentFiles } from '@/lib/content';
import { renderMDX } from '@/lib/mdx';
import { PageTransition } from '@/components/effects/page-transition';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import { PixelButton } from '@/components/ui/pixel-button';
import Link from 'next/link';

export function generateStaticParams() {
  const articles = getContentFiles('gallery/articles');
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getContentFiles('gallery/articles');
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="font-mono text-text-tertiary">ARTICLE.NOT_FOUND</p>
      </div>
    );
  }

  const content = await renderMDX(article.content);

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8">
          <p className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-2">
            {article.data.date as string}
          </p>
          <h1 className="font-mono text-2xl text-text-primary tracking-wider mb-2">
            {article.data.title as string}
          </h1>
          <p className="text-sm text-text-tertiary font-mono">
            by {article.data.author as string}
          </p>
        </div>

        <DotMatrixLine className="mb-8" />

        <div className="prose-dg">
          {content}
        </div>

        <DotMatrixLine className="my-8" />

        <Link href="/gallery">
          <PixelButton variant="ghost">← 返回画廊</PixelButton>
        </Link>
      </article>
    </PageTransition>
  );
}
