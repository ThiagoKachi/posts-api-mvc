import { FindPostByIdController } from '../controllers/find-post-by-id-controller';
import { PostDrizzleRepository } from '../repositories/post-drizzle-repository';
import { DbFindPostById } from '../usecases/find-post-by-id';

export const makeFindPostByIdControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const postService = new DbFindPostById(postRepository);
  const findPostByIdController = new FindPostByIdController(postService);

  return findPostByIdController;
};
