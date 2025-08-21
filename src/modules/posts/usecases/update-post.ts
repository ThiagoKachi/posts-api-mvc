import { NotFoundError } from '@shared/errors/app-error';
import { IFindPostByIdRepository } from '../interfaces/db/find-post-by-id';
import { IUpdatePostRepository } from '../interfaces/db/update-post';
import { IUpdatePost } from '../interfaces/usecases/update-post';
import { IPost, IUpdatePostModel } from '../models/Post';

export class DbUpdatePost implements IUpdatePost {
  constructor(
    private readonly findPostByIdRepository: IFindPostByIdRepository,
    private readonly updatePostRepository: IUpdatePostRepository,
  ) {}

  async updatePost(id: string, postData: IUpdatePostModel): Promise<IPost> {
    const post = await this.findPostByIdRepository.findPostById(id);

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const newPost = await this.updatePostRepository.updatePost(id, {
      ...post,
      ...postData,
    });

    return newPost;
  }
}
