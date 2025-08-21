import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IFindPostById } from '../interfaces/usecases/find-post-by-id';

export class FindPostByIdController {
  constructor(private readonly findPostByIdUseCase: IFindPostById) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;

    const post = await this.findPostByIdUseCase.findPostById(id);

    return responseSuccess(response, post, 200);
  }
}
