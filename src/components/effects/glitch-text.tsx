import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  className?: string;
}

export function GlitchText({ text, as: Tag = 'span', className }: GlitchTextProps) {
  return (
    <Tag
      className={cn('glitch-text font-mono', className)}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
