import { NotFoundError } from '@shared/errors/app-error';
import { IFindPostByIdRepository } from '../interfaces/db/find-post-by-id';
import { IFindPostById } from '../interfaces/usecases/find-post-by-id';
import { IPost } from '../models/Post';

export class DbFindPostById implements IFindPostById {
  constructor(private readonly findPostByIdRepository: IFindPostByIdRepository) {}

  async findPostById(id: string): Promise<IPost | null> {
    const post = await this.findPostByIdRepository.findPostById(id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return post;
  }
}
