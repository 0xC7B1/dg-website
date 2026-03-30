'use client';

import { useEffect, useState, useRef } from 'react';

export function useActiveSection(ids: string[], rootMargin = '-20% 0px -60% 0px') {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
