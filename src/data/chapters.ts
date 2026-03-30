import type { Chapter } from '@/types/chapter';

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    slug: 'chapter-1',
    number: 1,
    title: '第一章',
    subtitle: '灰山城',
    thumbnail: '/images/chapters/ch1-thumb.png',
    fullImage: '/images/chapters/ch1-full.png',
    description: '故事的起点，灰山城计划正式启动。一切从这里开始。',
  },
  {
    id: 'chapter-2',
    slug: 'chapter-2',
    number: 2,
    title: '第二章',
    subtitle: '信号干扰',
    thumbnail: '/images/chapters/ch2-thumb.png',
    fullImage: '/images/chapters/ch2-full.png',
    description: '当外部信号开始被干扰，真相逐渐从噪声中浮现。',
  },
  {
    id: 'chapter-3',
    slug: 'chapter-3',
    number: 3,
    title: '第三章',
    subtitle: '现实溢出',
    thumbnail: '/images/chapters/ch3-thumb.png',
    fullImage: '/images/chapters/ch3-full.png',
    description: '虚拟与现实的界限开始模糊，溢出事件频发。',
  },
  {
    id: 'chapter-4',
    slug: 'chapter-4',
    number: 4,
    title: '第四章',
    subtitle: '终端协议',
    thumbnail: '/images/chapters/ch4-thumb.png',
    fullImage: '/images/chapters/ch4-full.png',
    description: '最终的协议被启动，所有线索汇聚于此。',
  },
];
