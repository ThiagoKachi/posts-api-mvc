import { IPost } from 'src/modules/posts/models/Post';

export interface IFindUserPostsRepository {
  findUserPosts(id: string): Promise<IPost[]>;
}
