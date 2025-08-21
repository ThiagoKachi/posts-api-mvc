import { IFindPostsRepository } from '../interfaces/db/find-posts';
import { IFindPosts } from '../interfaces/usecases/find-posts';
import { IPost } from '../models/Post';

export class DbFindPosts implements IFindPosts {
  constructor(private readonly findPostsRepository: IFindPostsRepository) {}

  async findPosts(): Promise<IPost[]> {
    const posts = await this.findPostsRepository.findPosts();

    return posts;
  }
}
