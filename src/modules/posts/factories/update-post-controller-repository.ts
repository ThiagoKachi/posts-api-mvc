import { UpdatePostController } from '../controllers/update-post-controller';
import { PostDrizzleRepository } from '../repositories/post-drizzle-repository';
import { DbUpdatePost } from '../usecases/update-post';

export const makeUpdatePostControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const postService = new DbUpdatePost(postRepository, postRepository);
  const updatePostController = new UpdatePostController(postService);

  return updatePostController;
};
