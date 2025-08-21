import { ICreatePostModel, IPost } from '../../models/Post';

export interface ICreatePost {
  createPost(postData: ICreatePostModel): Promise<IPost>;
}
