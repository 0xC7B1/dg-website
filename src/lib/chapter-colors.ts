export type ChapterAccent = 'white' | 'cyan' | 'magenta' | 'yellow' | 'key';

export interface ChapterColorConfig {
  /** Tailwind text color class */
  text: string;
  /** Tailwind border color class */
  border: string;
  /** Tailwind bg with low opacity */
  bg: string;
  /** Tailwind bg full opacity (for active buttons etc.) */
  bgSolid: string;
  /** Hex value for inline styles / SVG */
  hex: string;
}

export const chapterColorMap: Record<ChapterAccent, ChapterColorConfig> = {
  white: {
    text: 'text-accent-white',
    border: 'border-accent-white',
    bg: 'bg-accent-white/10',
    bgSolid: 'bg-accent-white',
    hex: '#d0d0dc',
  },
  cyan: {
    text: 'text-accent-cyan',
    border: 'border-accent-cyan',
    bg: 'bg-accent-cyan/10',
    bgSolid: 'bg-accent-cyan',
    hex: '#00cccc',
  },
  magenta: {
    text: 'text-accent-magenta',
    border: 'border-accent-magenta',
    bg: 'bg-accent-magenta/10',
    bgSolid: 'bg-accent-magenta',
    hex: '#cc0066',
  },
  yellow: {
    text: 'text-accent-yellow',
    border: 'border-accent-yellow',
    bg: 'bg-accent-yellow/10',
    bgSolid: 'bg-accent-yellow',
    hex: '#cccc00',
  },
  key: {
    text: 'text-accent-key',
    border: 'border-accent-key',
    bg: 'bg-accent-key/20',
    bgSolid: 'bg-accent-key',
    hex: '#333344',
  },
};

/** Get color config for a chapter accent. Falls back to 'white'. */
export function getChapterColor(accent?: ChapterAccent): ChapterColorConfig {
  return chapterColorMap[accent ?? 'white'];
}
