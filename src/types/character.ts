export interface Character {
  id: string;
  slug: string;
  name: string;
  type: 'npc' | 'player';
  avatar: string;
  portrait: string;
  tagline: string;
  summary: string;
  chapter: string;
  info: Record<string, string>;
  identity: string;
  description: string;
  personality: {
    c: PersonalityChannel;
    m: PersonalityChannel;
    y: PersonalityChannel;
    k: PersonalityChannel;
  };
}

export interface PersonalityChannel {
  label: string;
  unlocked: boolean;
  content: string;
}
