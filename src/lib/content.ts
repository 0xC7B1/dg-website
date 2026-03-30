import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export function getContentFile(relativePath: string): { data: Record<string, unknown>; content: string } {
  const fullPath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

export function getContentFiles(dir: string): { slug: string; data: Record<string, unknown>; content: string }[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(fullDir, filename), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.mdx?$/, ''),
        data,
        content,
      };
    })
    .sort((a, b) => {
      const orderA = (a.data.order as number) ?? 0;
      const orderB = (b.data.order as number) ?? 0;
      return orderA - orderB;
    });
}

export function getJsonFile<T>(relativePath: string): T {
  const fullPath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw) as T;
}
