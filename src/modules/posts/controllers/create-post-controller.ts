import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { ICreatePost } from '../interfaces/usecases/create-post';
import { validateCreatePost } from '../validators/create-post-validator';

export class CreatePostController {
  constructor(private readonly createPostUseCase: ICreatePost) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const data = validateCreatePost(request.body);

    const post = await this.createPostUseCase.createPost(data);

    return responseSuccess(response, post, 201,  'Post created successfully');
  }
}
