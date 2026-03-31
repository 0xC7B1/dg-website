import type { ChapterAccent } from '@/lib/chapter-colors';

export interface Chapter {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  thumbnail: string;
  fullImage: string;
  description: string;
  accentColor: ChapterAccent;
}
