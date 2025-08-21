import { IPost } from '../../models/Post';

export interface IFindPosts {
  findPosts(): Promise<IPost[]>;
}
