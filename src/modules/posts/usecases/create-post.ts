import { NotFoundError } from '@shared/errors/app-error';
import { IFindUserByIdRepository } from 'src/modules/users/interfaces/db/find-user-by-id';
import { ICreatePostRepository } from '../interfaces/db/create-post';
import { ICreatePost } from '../interfaces/usecases/create-post';
import { ICreatePostModel, IPost } from '../models/Post';

export class DbCreatePost implements ICreatePost {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly createPostRepository: ICreatePostRepository,
  ) {}

  async createPost(postData: ICreatePostModel): Promise<IPost> {
    const user = await this.findUserByIdRepository.findUserById(String(postData.author_id));

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const newPost = await this.createPostRepository.add(postData);

    return newPost;
  }
}
