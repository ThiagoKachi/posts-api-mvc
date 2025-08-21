import { NotFoundError } from '@shared/errors/app-error';
import { IDeletePostRepository } from '../interfaces/db/delete-post';
import { IDeletePost } from '../interfaces/usecases/delete-post';

export class DbDeletePost implements IDeletePost {
  constructor(
    private readonly deletePostRepository: IDeletePostRepository,
  ) {}

  async deletePost(id: string): Promise<void> {
    const postDeleted = await this.deletePostRepository.deletePost(id);

    if (postDeleted === 0) {
      throw new NotFoundError('Post not found');
    }

    return;
  }
}
