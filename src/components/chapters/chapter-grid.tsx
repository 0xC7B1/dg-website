'use client';

import { cn } from '@/lib/utils';
import type { Chapter } from '@/types/chapter';
import { useState } from 'react';
import Link from 'next/link';

interface ChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ChapterCard({ chapter, isExpanded, onHover, onLeave }: ChapterCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className={cn(
        'relative overflow-hidden transition-all duration-500 ease-in-out pixel-border group',
        'bg-bg-secondary border border-border-default',
        isExpanded ? 'flex-[3]' : 'flex-[1]'
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Background image (falls back to gradient) */}
      {!imgError ? (
        <img
          src={chapter.thumbnail}
          alt={chapter.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300',
            isExpanded ? 'opacity-80' : 'opacity-60'
          )}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-bg-tertiary to-bg-primary opacity-50" />
          <div className="absolute inset-0 dot-matrix-bg opacity-10" />
        </>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />

      {/* Hover overlay */}
      <div className={cn(
        'absolute inset-0 bg-accent-cyan/5 transition-opacity duration-300',
        isExpanded ? 'opacity-100' : 'opacity-0'
      )} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        {/* Chapter number */}
        <span className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-2">
          CHAPTER.{String(chapter.number).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className={cn(
          'font-mono text-xl tracking-wider text-text-primary transition-all duration-300',
          isExpanded && 'text-2xl'
        )}>
          {chapter.title}
        </h3>

        {/* Subtitle */}
        {chapter.subtitle && (
          <p className="font-mono text-sm text-text-secondary mt-1">
            {chapter.subtitle}
          </p>
        )}

        {/* Description (only when expanded) */}
        <p className={cn(
          'text-sm text-text-tertiary mt-3 leading-relaxed transition-all duration-300 overflow-hidden',
          isExpanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        )}>
          {chapter.description}
        </p>

        {/* Enter indicator */}
        <div className={cn(
          'mt-4 font-mono text-xs text-accent-cyan tracking-wider transition-all duration-300',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {'>'} ENTER →
        </div>
      </div>

      {/* Top border accent */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-[2px] bg-accent-cyan transition-opacity duration-300',
        isExpanded ? 'opacity-100' : 'opacity-0'
      )} />
    </Link>
  );
}

interface ChapterGridProps {
  chapters: Chapter[];
  className?: string;
}

export function ChapterGrid({ chapters, className }: ChapterGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn('flex flex-col md:flex-row gap-3 h-[70vh]', className)}>
      {chapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          isExpanded={hoveredId === chapter.id}
          onHover={() => setHoveredId(chapter.id)}
          onLeave={() => setHoveredId(null)}
        />
      ))}
    </div>
  );
}
