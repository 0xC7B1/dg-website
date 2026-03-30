'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TreeNode {
  id: string;
  label: string;
  locked?: boolean;
  children?: TreeNode[];
}

interface TreeMenuProps {
  nodes: TreeNode[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  level?: number;
}

export function TreeMenu({ nodes, activeId, onSelect, className, level = 0 }: TreeMenuProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {nodes.map((node) => (
        <TreeMenuItem
          key={node.id}
          node={node}
          activeId={activeId}
          onSelect={onSelect}
          level={level}
        />
      ))}
    </div>
  );
}

function TreeMenuItem({
  node,
  activeId,
  onSelect,
  level,
}: {
  node: TreeNode;
  activeId: string;
  onSelect: (id: string) => void;
  level: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeId === node.id;

  return (
    <div>
      <button
        onClick={() => {
          if (node.locked) return;
          if (hasChildren) {
            setExpanded(!expanded);
          } else {
            onSelect(node.id);
          }
        }}
        disabled={node.locked}
        className={cn(
          'flex w-full items-center gap-2 py-1.5 text-sm font-mono transition-colors duration-150',
          'hover:text-text-primary hover:bg-bg-hover',
          isActive ? 'text-accent-cyan' : 'text-text-secondary',
          node.locked && 'text-text-locked cursor-not-allowed opacity-50'
        )}
        style={{ paddingLeft: `${(level * 16) + 8}px` }}
      >
        {hasChildren && (
          <ChevronRight
            className={cn(
              'h-3 w-3 shrink-0 transition-transform duration-200',
              expanded && 'rotate-90'
            )}
          />
        )}
        {!hasChildren && <span className="w-3 shrink-0" />}
        <span className="truncate">{node.locked ? '???' : node.label}</span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <TreeMenu
              nodes={node.children!}
              activeId={activeId}
              onSelect={onSelect}
              level={level + 1}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
