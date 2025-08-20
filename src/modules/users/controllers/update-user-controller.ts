import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IUpdateUser } from '../interfaces/usecases/update-user';
import { validateUpdateUser } from '../validators/update-account-validator';

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: IUpdateUser) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const { id } = request.params;
    const data = validateUpdateUser(request.body);

    const user = await this.updateUserUseCase.updateUser(id, data);

    return responseSuccess(response, user, 200,  'User updated successfully');
  }
}
