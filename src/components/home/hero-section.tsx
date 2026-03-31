'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlitchText } from '@/components/effects/glitch-text';
import { PixelButton } from '@/components/ui/pixel-button';
import { useIntroAnimation } from '@/components/effects/intro-animation';
import Link from 'next/link';

interface HeroSectionProps {
  className?: string;
}

function HeroLogo({ visible }: { visible: boolean }) {
  // Flip this to true when a video asset is ready
  const useVideo = false;

  if (useVideo) {
    return (
      <video
        autoPlay
        muted
        playsInline
        className={cn(
          'transition-opacity duration-500',
          visible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <source src="/images/hero/logo.webm" type="video/webm" />
      </video>
    );
  }

  return (
    <div
      className={cn(
        'transition-opacity duration-500',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <GlitchText
        text="DIGITAL_GHOST"
        as="h1"
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] text-text-primary"
      />
      <p className="font-mono text-sm md:text-base text-accent-cyan tracking-[0.2em] mt-3 opacity-70">
        电子分身
      </p>
    </div>
  );
}

export function HeroSection({ className }: HeroSectionProps) {
  const [phase, setPhase] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { setPhase: setGlobalPhase } = useIntroAnimation();

  // Phase transitions:
  //   0→1 (300ms)  logo
  //   1→2 (1800ms) background + logo shift + CTA
  //   2→3 (2500ms) navbar
  //   3→4 (3500ms) scroll indicator
  useEffect(() => {
    const timers = [
      setTimeout(() => { setPhase(1); setGlobalPhase(1); }, 300),
      setTimeout(() => { setPhase(2); setGlobalPhase(2); }, 1800),
      setTimeout(() => { setPhase(3); setGlobalPhase(3); }, 2500),
      setTimeout(() => { setPhase(4); setGlobalPhase(4); }, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [setGlobalPhase]);

  // Scroll-based background fade
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const scrollFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Phase-based BG opacity: 0 during phases 0-1, 1 at phase 2+
  const phaseBgOpacity = phase >= 2 ? 1 : 0;

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative h-screen -mt-14 flex flex-col items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background image with scroll fade */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: scrollFade }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: phaseBgOpacity }}
        >
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/hero-mobile.png"
            />
            <img
              src="/images/hero/hero-pc.png"
              alt=""
              loading="eager"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </motion.div>

      {/* Dark fallback behind image */}
      <div className="absolute inset-0 bg-bg-primary" style={{ zIndex: -1 }} />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-bg-primary)_100%)] z-[1]" />

      {/* Content — logo animates downward at phase 2 */}
      <motion.div
        className="relative z-10 text-center px-6"
        animate={{
          y: phase >= 2 ? '10vh' : '0vh',
        }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <HeroLogo visible={phase >= 1} />

        {/* CTA button — appears at phase 2 */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/chapters">
            <PixelButton variant="primary" size="lg">
              开始探索
            </PixelButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll-down indicator — appears at phase 4 */}
      <motion.div
        className="absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-text-tertiary" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-[1]" />
    </section>
  );
}
