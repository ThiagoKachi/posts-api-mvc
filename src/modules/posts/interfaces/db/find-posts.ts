import { IPost } from 'src/modules/posts/models/Post';

export interface IFindPostsRepository {
  findPosts(): Promise<IPost[]>;
}
