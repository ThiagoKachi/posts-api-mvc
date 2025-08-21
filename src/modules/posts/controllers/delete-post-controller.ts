import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IDeletePost } from '../interfaces/usecases/delete-post';

export class DeletePostController {
  constructor(private readonly deletePostUseCase: IDeletePost) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;

    await this.deletePostUseCase.deletePost(id);

    return responseSuccess(response, null, 204);
  }
}
