import { IPost, IUpdatePostModel } from 'src/modules/posts/models/Post';

export interface IUpdatePostRepository {
  updatePost(id: string, postData: IUpdatePostModel): Promise<IPost>;
}
