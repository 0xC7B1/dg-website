'use client';

import { cn } from '@/lib/utils';
import type { PersonalityChannel } from '@/types/character';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const channelColors: Record<string, { bg: string; border: string; text: string }> = {
  c: { bg: 'bg-accent-cyan/10', border: 'border-accent-cyan', text: 'text-accent-cyan' },
  m: { bg: 'bg-accent-magenta/10', border: 'border-accent-magenta', text: 'text-accent-magenta' },
  y: { bg: 'bg-accent-yellow/10', border: 'border-accent-yellow', text: 'text-accent-yellow' },
  k: { bg: 'bg-accent-key/20', border: 'border-accent-key', text: 'text-text-secondary' },
};

interface CMYKPanelProps {
  personality: {
    c: PersonalityChannel;
    m: PersonalityChannel;
    y: PersonalityChannel;
    k: PersonalityChannel;
  };
  className?: string;
}

export function CMYKPanel({ personality, className }: CMYKPanelProps) {
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);

  const channels = Object.entries(personality) as [string, PersonalityChannel][];

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="font-mono text-xs text-text-tertiary tracking-[0.2em] uppercase mb-3">
        {'>'} 人格档案 // CMYK
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {channels.map(([key, channel]) => {
          const colors = channelColors[key];
          return (
            <button
              key={key}
              onClick={() => {
                if (channel.unlocked) {
                  setExpandedChannel(expandedChannel === key ? null : key);
                }
              }}
              className={cn(
                'relative p-3 border pixel-border-sm text-left transition-all duration-150',
                colors.bg,
                colors.border,
                channel.unlocked
                  ? 'cursor-pointer hover:opacity-80'
                  : 'cursor-not-allowed opacity-40'
              )}
            >
              <span className={cn('font-mono text-xs uppercase tracking-wider', colors.text)}>
                {key.toUpperCase()}
              </span>
              <p className="font-mono text-xs mt-1 text-text-secondary">
                {channel.unlocked ? channel.label : '???'}
              </p>
              {!channel.unlocked && (
                <Lock className="absolute top-2 right-2 h-3 w-3 text-text-locked" />
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded channel content */}
      <AnimatePresence>
        {expandedChannel && personality[expandedChannel as keyof typeof personality]?.unlocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={cn(
              'mt-2 p-4 border pixel-border-sm text-sm text-text-secondary leading-relaxed',
              channelColors[expandedChannel].bg,
              channelColors[expandedChannel].border,
            )}>
              {personality[expandedChannel as keyof typeof personality].content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
