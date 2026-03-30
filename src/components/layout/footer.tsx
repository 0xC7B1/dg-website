import { DotMatrixLine } from '@/components/ui/dot-matrix-line';

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <DotMatrixLine className="mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-tertiary tracking-wider">
            &copy; {new Date().getFullYear()} DIGITAL_GHOST PROJECT
          </p>
          <p className="font-mono text-xs text-text-locked tracking-wider">
            // SYSTEM.STATUS: ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}
