import { FindPostsController } from '../controllers/find-posts-controller';
import { PostDrizzleRepository } from '../repositories/post-drizzle-repository';
import { DbFindPosts } from '../usecases/find-posts';

export const makeFindPostsControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const postService = new DbFindPosts(postRepository);
  const findPostsController = new FindPostsController(postService);

  return findPostsController;
};
