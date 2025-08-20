import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IDeleteUser } from '../interfaces/usecases/delete-user';

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: IDeleteUser) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;

    await this.deleteUserUseCase.deleteUser(id);

    return responseSuccess(response, null, 204);
  }
}
