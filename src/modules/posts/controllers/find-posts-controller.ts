import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IFindPosts } from '../interfaces/usecases/find-posts';

export class FindPostsController {
  constructor(private readonly findPostsUseCase: IFindPosts) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const posts = await this.findPostsUseCase.findPosts();

    return responseSuccess(response, posts, 200);
  }
}
