export interface Post {
  title: string;
  date: string;
  text: string;
  keywords: string[];
  id: number;
  type: PostTypes;
  isLiked: boolean;
  like: (value: boolean) => void;
}

export enum PostTypes {
  SHORT = 'short',
  LONG = 'long'
}
