import { DeletePostController } from '../controllers/delete-post-controller';
import { PostDrizzleRepository } from '../repositories/post-drizzle-repository';
import { DbDeletePost } from '../usecases/delete-post';

export const makeDeletePostControllerRepository = () => {
  const postRepository = new PostDrizzleRepository();
  const postService = new DbDeletePost(postRepository);
  const deletePostController = new DeletePostController(postService);

  return deletePostController;
};
