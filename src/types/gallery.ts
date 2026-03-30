export interface Article {
  slug: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  coverImage?: string;
  chapter?: string;
  player?: string;
  content?: string;
}

export interface Artwork {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  thumbnail: string;
  chapter?: string;
  player?: string;
  width: number;
  height: number;
}
