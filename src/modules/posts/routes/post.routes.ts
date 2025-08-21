import { errorHandler } from '@shared/errors/error-handler';
import { Router } from 'express';
import { makeCreatePostControllerRepository } from '../factories/create-post-controller-repository';
import { makeDeletePostControllerRepository } from '../factories/delete-post-controller-repository';
import { makeFindPostByIdControllerRepository } from '../factories/find-post-by-id-controller-repository';
import { makeFindPostsControllerRepository } from '../factories/find-posts-controller-repository';
import { makeUpdatePostControllerRepository } from '../factories/update-post-controller-repository';

const router = Router();

const createPostController = makeCreatePostControllerRepository();
const findPostsController = makeFindPostsControllerRepository();
const findPostByIdController = makeFindPostByIdControllerRepository();
const deletePostController = makeDeletePostControllerRepository();
const updatePostController = makeUpdatePostControllerRepository();

router.post('/posts', (req, res, next) => createPostController.handle(req, res, next));
router.get('/posts', (req, res, next) => findPostsController.handle(req, res, next));
router.get('/posts/:id', (req, res, next) => findPostByIdController.handle(req, res, next));
router.delete('/posts/:id', (req, res, next) => deletePostController.handle(req, res, next));
router.put('/posts/:id', (req, res, next) => updatePostController.handle(req, res, next));

router.use(errorHandler);

export default router;
