'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MatrixRainProps {
  className?: string;
  charSet?: string;
  speed?: number;
  density?: number;
}

const DEFAULT_CHARS = 'ゴースト幽霊データ0123456789ABCDEF';

export function MatrixRain({
  className,
  charSet = DEFAULT_CHARS,
  speed = 33,
  density = 0.6,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      columns = Math.floor(canvas!.width / fontSize);
      drops = new Array(columns).fill(1);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx!.fillStyle = 'rgba(10, 10, 12, 0.05)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.fillStyle = '#00cccc';
      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > density) continue;

        const char = charSet[Math.floor(Math.random() * charSet.length)];
        ctx!.fillStyle = Math.random() > 0.95 ? '#e0e0e4' : '#00cccc';
        ctx!.globalAlpha = 0.3 + Math.random() * 0.7;
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx!.globalAlpha = 1;

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [charSet, speed, density]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      aria-hidden="true"
    />
  );
}
