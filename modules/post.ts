import { Post, PostTypes } from '~/types/post';

type Props = Pick<Post, 'id' | 'title' | 'date' | 'keywords' | 'text' | 'type'>;

export class PostImpl implements Post {
  public id: number;
  public title: string;
  public date: string;
  public keywords: string[];
  public text: string;
  public type: PostTypes;
  private _isLiked: boolean = false;

  constructor({ id, title, date, keywords, text, type }: Props) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.keywords = keywords;
    this.text = text;
    this.type = type;
  }

  get isLiked() {
    return this._isLiked;
  }

  public like(value: boolean) {
    this._isLiked = value;
  }
}
