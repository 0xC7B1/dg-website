'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FallbackImageProps {
  src: string | undefined;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function FallbackImage({
  src,
  alt,
  fallback,
  className,
  loading = 'lazy',
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setError(true)}
      className={cn('h-full w-full object-cover', className)}
    />
  );
}
