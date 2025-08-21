import { IPost } from 'src/modules/posts/models/Post';

export interface IFindPostByIdRepository {
  findPostById(id: string): Promise<IPost | null>;
}
