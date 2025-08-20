import { errorHandler } from '@shared/errors/error-handler';
import { Router } from 'express';
import { makeCreateUserControllerRepository } from '../factories/create-user-controller-repository';
import { makeDeleteUserControllerRepository } from '../factories/delete-user-controller-repository';
import { makeFindUserByIdControllerRepository } from '../factories/find-user-by-id-controller-repository';
import { makeFindUserPostsControllerRepository } from '../factories/find-user-posts-controller-repository';
import { makeFindUsersControllerRepository } from '../factories/find-users-controller-repository';
import { makeUpdateUserControllerRepository } from '../factories/update-user-controller-repository';

const router = Router();

const createUserController = makeCreateUserControllerRepository();
const findUsersController = makeFindUsersControllerRepository();
const findUserByIdController = makeFindUserByIdControllerRepository();
const deleteUserController = makeDeleteUserControllerRepository();
const updateUserController = makeUpdateUserControllerRepository();
const findUserPostsController = makeFindUserPostsControllerRepository();

router.post('/users', (req, res, next) => createUserController.handle(req, res, next));
router.get('/users', (req, res, next) => findUsersController.handle(req, res, next));
router.get('/users/:id', (req, res, next) => findUserByIdController.handle(req, res, next));
router.delete('/users/:id', (req, res, next) => deleteUserController.handle(req, res, next));
router.put('/users/:id', (req, res, next) => updateUserController.handle(req, res, next));
router.get('/users/:id/posts', (req, res, next) => findUserPostsController.handle(req, res, next));

router.use(errorHandler);

export default router;
