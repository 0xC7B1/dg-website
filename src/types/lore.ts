export interface LoreSector {
  id: string;
  slug: string;
  title: string;
  chapter: number;
  entries: LoreEntry[];
}

export interface LoreEntry {
  id: string;
  slug: string;
  title: string;
  unlocked: boolean;
  content?: string;
  children?: LoreEntry[];
}
