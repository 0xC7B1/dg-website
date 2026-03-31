import type { Metadata } from 'next';
import { notoSansSC, shareTechMono } from '@/lib/fonts';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScanlineOverlay } from '@/components/effects/scanline-overlay';
import { IntroAnimationProvider } from '@/components/effects/intro-animation';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DIGITAL GHOST',
    template: '%s | DIGITAL GHOST',
  },
  description: '数字幽灵 — 一个基于用户生成内容的TRPG企划',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${shareTechMono.variable}`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <IntroAnimationProvider>
          <ScanlineOverlay intensity="light" />
          <Header />
          <div className="pt-14">
            {children}
          </div>
          <Footer />
        </IntroAnimationProvider>
      </body>
    </html>
  );
}
