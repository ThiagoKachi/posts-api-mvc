import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { IFindUsers } from '../interfaces/usecases/find-users';

export class FindUsersController {
  constructor(private readonly findUsersUseCase: IFindUsers) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const users = await this.findUsersUseCase.findUsers();

    return responseSuccess(response, users, 200);
  }
}
