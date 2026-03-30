'use client';

import { cn } from '@/lib/utils';
import type { Character } from '@/types/character';
import { CMYKPanel } from './cmyk-panel';
import { motion } from 'framer-motion';

interface CharacterDetailProps {
  character: Character | null;
  className?: string;
}

export function CharacterDetail({ character, className }: CharacterDetailProps) {
  if (!character) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <p className="font-mono text-sm text-text-tertiary tracking-wider">
          {'>'} SELECT.CHARACTER // 请选择角色
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className={cn('p-6 overflow-y-auto h-full', className)}
    >
      {/* Portrait placeholder */}
      <div className="w-full aspect-[3/4] max-w-xs mx-auto mb-6 pixel-border bg-bg-tertiary flex items-center justify-center">
        <span className="font-mono text-4xl text-text-tertiary">{character.name[0]}</span>
      </div>

      {/* Name and tagline */}
      <h2 className="font-mono text-2xl text-text-primary tracking-wider mb-1">
        {character.name}
      </h2>
      <p className="font-mono text-sm text-accent-cyan mb-4">{character.tagline}</p>

      {/* Basic info */}
      <div className="border border-border-default pixel-border-sm p-4 mb-4 space-y-2">
        <h3 className="font-mono text-xs text-text-tertiary tracking-[0.2em] uppercase mb-3">
          {'>'} 基本信息
        </h3>
        {Object.entries(character.info).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="font-mono text-text-tertiary">{key}</span>
            <span className="text-text-secondary">{value}</span>
          </div>
        ))}
      </div>

      {/* Identity */}
      <div className="mb-4">
        <h3 className="font-mono text-xs text-text-tertiary tracking-[0.2em] uppercase mb-2">
          {'>'} 身份
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{character.identity}</p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="font-mono text-xs text-text-tertiary tracking-[0.2em] uppercase mb-2">
          {'>'} 角色介绍
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{character.description}</p>
      </div>

      {/* CMYK Personality */}
      <CMYKPanel personality={character.personality} />
    </motion.div>
  );
}
