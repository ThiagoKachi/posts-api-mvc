import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { CreatePostController } from '../controllers/create-post-controller';
import { PostDrizzleRepository } from '../repositories/post-drizzle-repository';
import { DbCreatePost } from '../usecases/create-post';

export const makeCreatePostControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const userRepository = new UserDrizzleRepository();
  const postService = new DbCreatePost(userRepository, postRepository);
  const createPostController = new CreatePostController(postService);

  return createPostController;
};
