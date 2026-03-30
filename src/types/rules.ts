export interface RulesSection {
  id: string;
  slug: string;
  title: string;
  category: 'quickstart' | 'full-rules';
  order: number;
  content?: string;
}
