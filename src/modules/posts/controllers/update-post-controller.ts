import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IUpdatePost } from '../interfaces/usecases/update-post';
import { validateUpdatePost } from '../validators/update-post-validator';

export class UpdatePostController {
  constructor(private readonly updatePostUseCase: IUpdatePost) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;
    const data = validateUpdatePost(request.body);

    const post = await this.updatePostUseCase.updatePost(id, data);

    return responseSuccess(response, post, 200,  'Post updated successfully');
  }
}
