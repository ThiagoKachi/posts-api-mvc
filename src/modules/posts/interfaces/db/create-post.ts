import { ICreatePostModel, IPost } from 'src/modules/posts/models/Post';

export interface ICreatePostRepository {
  add(postData: ICreatePostModel): Promise<IPost>;
}
