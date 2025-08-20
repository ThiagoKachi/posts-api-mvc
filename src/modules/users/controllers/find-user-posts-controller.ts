import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IFindUserPosts } from '../interfaces/usecases/find-user-posts';

export class FindUserPostsController {
  constructor(private readonly findUserPostsUseCase: IFindUserPosts) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;

    const userPosts = await this.findUserPostsUseCase.findUserPosts(id);

    return responseSuccess(response, userPosts, 200);
  }
}
