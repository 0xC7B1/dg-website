import { cn } from '@/lib/utils';
import { Collapsible } from '@/components/ui/collapsible';

interface DocumentSectionProps {
  title: string;
  tag: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function DocumentSection({
  title,
  tag,
  children,
  defaultOpen = false,
  className,
}: DocumentSectionProps) {
  return (
    <div className={cn('border border-border-default bg-bg-secondary/50', className)}>
      <Collapsible title={title} titleTag={tag} defaultOpen={defaultOpen}>
        <div className="prose-dg text-sm">
          {children}
        </div>
      </Collapsible>
    </div>
  );
}
