import { IPost, IUpdatePostModel } from '../../models/Post';

export interface IUpdatePost {
  updatePost(id: string, postData: IUpdatePostModel): Promise<IPost>;
}
