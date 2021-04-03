export interface Post {
  title: string;
  date: string;
  text: string;
  keywords: string[];
  number: number;
  type: PostTypes;
}

export enum PostTypes {
  SHORT = 'short',
  LONG = 'long'
}
