import { PostDrizzleRepository } from 'src/modules/posts/repositories/post-drizzle-repository';
import { FindUserPostsController } from '../controllers/find-user-posts-controller';
import { UserDrizzleRepository } from '../repositories/user-drizzle-repository';
import { DbFindUserPosts } from '../usecases/find-user-posts';

export const makeFindUserPostsControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const userRepository = new UserDrizzleRepository();
  const postService = new DbFindUserPosts(userRepository, postRepository);
  const findUserPostsController = new FindUserPostsController(postService);

  return findUserPostsController;
};
