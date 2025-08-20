import { NotFoundError } from '@shared/errors/app-error';
import { IPost } from 'src/modules/posts/models/Post';
import { IFindUserByIdRepository } from '../interfaces/db/find-user-by-id';
import { IFindUserPostsRepository } from '../interfaces/db/find-user-posts';
import { IFindUserPosts } from '../interfaces/usecases/find-user-posts';

export class DbFindUserPosts implements IFindUserPosts {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly findUserPostsRepository: IFindUserPostsRepository,
  ) {}

  async findUserPosts(id: string): Promise<IPost[]> {
    const user = await this.findUserByIdRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const userPosts = await this.findUserPostsRepository.findUserPosts(id);

    return userPosts;
  }
}
