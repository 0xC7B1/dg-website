'use client';

import { cn } from '@/lib/utils';
import { getChapterColor } from '@/lib/chapter-colors';
import type { Chapter } from '@/types/chapter';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}

const LOCK_THUMBNAIL = '/images/chapters/ch-lock.png';

function ChapterCard({ chapter, isExpanded, onHover, onLeave, onTap }: ChapterCardProps) {
  const [imgError, setImgError] = useState(false);
  const colors = getChapterColor(chapter.accentColor);
  const isTouchRef = useRef(false);
  const router = useRouter();
  const isLocked = !!chapter.locked;
  const displayThumbnail = isLocked ? LOCK_THUMBNAIL : chapter.thumbnail;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isTouchRef.current = e.pointerType === 'touch';
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isLocked) return;
    if (isTouchRef.current) {
      if (!isExpanded) {
        e.preventDefault();
        onTap();
      } else {
        router.push(`/chapters/${chapter.slug}`);
      }
    } else {
      router.push(`/chapters/${chapter.slug}`);
    }
  }, [isLocked, isExpanded, onTap, router, chapter.slug]);

  return (
    <div
      role={isLocked ? undefined : 'link'}
      tabIndex={isLocked ? -1 : 0}
      className={cn(
        'relative overflow-hidden transition-all duration-500 ease-in-out pixel-border group',
        'bg-bg-secondary border border-border-default',
        'min-h-[140px] md:min-h-0',
        isLocked
          ? 'flex-[1] cursor-not-allowed opacity-60 grayscale'
          : cn('cursor-pointer', isExpanded ? 'flex-[3]' : 'flex-[1]')
      )}
      style={{ '--chapter-accent': colors.hex } as React.CSSProperties}
      onMouseEnter={isLocked ? undefined : onHover}
      onMouseLeave={isLocked ? undefined : onLeave}
      onPointerDown={isLocked ? undefined : handlePointerDown}
      onClick={handleClick}
      onKeyDown={isLocked ? undefined : (e) => { if (e.key === 'Enter') router.push(`/chapters/${chapter.slug}`); }}
    >
      {/* Background image (falls back to gradient) */}
      {!imgError ? (
        <img
          src={displayThumbnail}
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
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0'
        )}
        style={{ backgroundColor: colors.hex, opacity: isExpanded ? 0.05 : 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-3 md:p-6">
        {/* Chapter number */}
        <span
          className="font-mono text-xs tracking-[0.3em] mb-2"
          style={{ color: 'var(--chapter-accent)' }}
        >
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

        {/* Description (only when expanded, delayed to avoid text reflow during card width transition) */}
        <p className={cn(
          'text-sm text-text-tertiary leading-relaxed transition-all duration-300 overflow-hidden',
          !isLocked && isExpanded ? 'max-h-24 opacity-100 mt-3 delay-300' : 'max-h-0 opacity-0 mt-0'
        )}>
          {chapter.description}
        </p>

        {/* Enter indicator / Lock indicator */}
        <div
          className={cn(
            'mt-4 font-mono text-xs tracking-wider transition-all duration-300',
            isLocked
              ? 'opacity-70 text-text-tertiary'
              : cn(isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
          )}
          style={isLocked ? undefined : { color: 'var(--chapter-accent)' }}
        >
          {isLocked ? '\u{1F512} LOCKED' : <>{'>'}  ENTER →</>}
        </div>
      </div>

      {/* Top border accent */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0'
        )}
        style={{ backgroundColor: 'var(--chapter-accent)' }}
      />
    </div>
  );
}

interface ChapterGridProps {
  chapters: Chapter[];
  className?: string;
}

export function ChapterGrid({ chapters, className }: ChapterGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn('flex flex-col md:flex-row gap-3 md:h-[70vh]', className)}>
      {chapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          isExpanded={hoveredId === chapter.id}
          onHover={() => setHoveredId(chapter.id)}
          onLeave={() => setHoveredId(null)}
          onTap={() => setHoveredId(hoveredId === chapter.id ? null : chapter.id)}
        />
      ))}
    </div>
  );
}
