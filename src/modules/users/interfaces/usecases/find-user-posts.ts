import { IPost } from 'src/modules/posts/models/Post';

export interface IFindUserPosts {
  findUserPosts(id: string): Promise<IPost[]>;
}
