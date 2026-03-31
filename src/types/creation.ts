/** 所有创作的公共字段 */
export interface CreationBase {
  id: string;
  title: string;
  author: string;
  date: string;
  chapter?: string;
  player?: string;
}

/** 文字创作 */
export interface Writing extends CreationBase {
  slug: string;
  summary: string;
  coverImage?: string;
  content?: string;
}

/** 视觉创作 */
export interface Visual extends CreationBase {
  image: string;
  thumbnail: string;
  width: number;
  height: number;
}

/** 音频创作 */
export interface Audio extends CreationBase {
  src: string;
  duration: number;
  coverImage?: string;
}

export type Creation = Writing | Visual | Audio;
