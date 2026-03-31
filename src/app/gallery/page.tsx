'use client';

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PixelCard } from '@/components/ui/pixel-card';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { PageTransition } from '@/components/effects/page-transition';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import { FilterBar } from '@/components/ui/filter-bar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function ArtworkImage({ artwork }: { artwork: typeof artworks[number] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-bg-tertiary"
      style={{ aspectRatio: `${artwork.width}/${artwork.height}` }}
    >
      {!imgError ? (
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full dot-matrix-bg flex items-center justify-center">
          <span className="font-mono text-sm text-text-tertiary">
            {artwork.title}
          </span>
        </div>
      )}
    </div>
  );
}

// Sample data — in production, loaded at build time from content files
const articles = [
  {
    slug: 'first-impression',
    title: '灰山城初印象',
    author: '示例作者',
    date: '2026-01-15',
    summary: '第一次踏入灰山城时的所见所闻所感。',
    chapter: 'chapter-1',
    player: 'player-a',
  },
];

const artworks = [
  {
    id: 'art-001',
    title: '灰山城全景',
    author: '示例画师',
    date: '2026-01-20',
    image: '/images/gallery/grey-mountain-panorama.png',
    chapter: 'chapter-1',
    width: 1920,
    height: 1080,
  },
  {
    id: 'art-002',
    title: '数据矿场',
    author: '示例画师',
    date: '2026-02-01',
    image: '/images/gallery/data-mine.png',
    chapter: 'chapter-1',
    width: 1200,
    height: 1600,
  },
];

const tabs = [
  { value: 'articles', label: '文' },
  { value: 'artworks', label: '画' },
];

const chapterFilters = [
  { value: 'all', label: '全部' },
  { value: 'prologue', label: '序章' },
  { value: 'chapter-1', label: '第一章' },
  { value: 'chapter-2', label: '第二章' },
  { value: 'chapter-3', label: '第三章' },
  { value: 'chapter-4', label: '第四章' },
];

export default function GalleryPage() {
  const [chapterFilter, setChapterFilter] = useState('all');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filteredArticles = chapterFilter === 'all'
    ? articles
    : articles.filter((a) => a.chapter === chapterFilter);

  const filteredArtworks = chapterFilter === 'all'
    ? artworks
    : artworks.filter((a) => a.chapter === chapterFilter);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
            {'>'} GALLERY.INDEX // 画廊
          </p>
          <h1 className="font-mono text-2xl text-text-primary tracking-wider">画廊</h1>
        </div>

        <FilterBar
          className="mb-6"
          filters={[
            {
              label: '章节',
              options: chapterFilters,
              value: chapterFilter,
              onChange: setChapterFilter,
            },
          ]}
        />

        <Tabs tabs={tabs} defaultValue="articles">
          {/* Articles tab */}
          <TabsContent value="articles" className="pt-6">
            {filteredArticles.length === 0 ? (
              <p className="font-mono text-sm text-text-tertiary text-center py-20">
                {'>'} NO_RESULTS // 暂无内容
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                  <Link key={article.slug} href={`/gallery/${article.slug}`}>
                    <PixelCard hoverable className="p-5 h-full">
                      <p className="font-mono text-xs text-accent-cyan mb-2">
                        {article.date}
                      </p>
                      <h3 className="font-mono text-base text-text-primary mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-3">
                        {article.summary}
                      </p>
                      <p className="text-xs text-text-tertiary font-mono">
                        by {article.author}
                      </p>
                    </PixelCard>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Artworks tab */}
          <TabsContent value="artworks" className="pt-6">
            {filteredArtworks.length === 0 ? (
              <p className="font-mono text-sm text-text-tertiary text-center py-20">
                {'>'} NO_RESULTS // 暂无内容
              </p>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {filteredArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="break-inside-avoid cursor-pointer group"
                    onClick={() => setLightboxSrc(artwork.image)}
                  >
                    <PixelCard hoverable className="overflow-hidden">
                      <ArtworkImage artwork={artwork} />
                      <div className="p-3">
                        <p className="font-mono text-xs text-text-primary">{artwork.title}</p>
                        <p className="text-xs text-text-tertiary mt-1">by {artwork.author}</p>
                      </div>
                    </PixelCard>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <ImageLightbox
          src={lightboxSrc}
          onClose={() => setLightboxSrc(null)}
        />
      </div>
    </PageTransition>
  );
}
