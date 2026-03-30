import { HeroSection } from '@/components/home/hero-section';
import { DocumentSection } from '@/components/home/document-section';
import { DotMatrixLine } from '@/components/ui/dot-matrix-line';
import { getContentFiles } from '@/lib/content';
import { renderMDX } from '@/lib/mdx';

export default async function HomePage() {
  const sections = getContentFiles('home');

  const renderedSections = await Promise.all(
    sections.map(async (section) => ({
      slug: section.slug,
      title: section.data.title as string,
      tag: section.data.tag as string,
      content: await renderMDX(section.content),
    }))
  );

  return (
    <main>
      <HeroSection />

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-text-tertiary tracking-[0.3em] mb-2">
            {'>'} FILE.INDEX // 档案目录
          </p>
          <DotMatrixLine className="mx-auto max-w-xs" />
        </div>

        {renderedSections.map((section, index) => (
          <div key={section.slug}>
            <DocumentSection
              title={section.title}
              tag={section.tag}
              defaultOpen={index === 0}
            >
              {section.content}
            </DocumentSection>
            {index < renderedSections.length - 1 && (
              <DotMatrixLine className="my-6" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
