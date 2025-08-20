import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IFindUserById } from '../interfaces/usecases/find-user-by-id';

export class FindUserByIdController {
  constructor(private readonly findUserByIdUseCase: IFindUserById) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;

    const user = await this.findUserByIdUseCase.findUserById(id);

    return responseSuccess(response, user, 200);
  }
}
