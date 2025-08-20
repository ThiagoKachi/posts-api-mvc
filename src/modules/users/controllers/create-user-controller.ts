import { responseSuccess } from '@shared/helpers/response-success';
import { NextFunction, Request, Response } from 'express';
import { ICreateUser } from '../interfaces/usecases/create-user';
import { validateCreateUser } from '../validators/create-account-validator';

export class CreateUserController {
  constructor(private readonly createUserUseCase: ICreateUser) {}

  async handle(request: Request, response: Response, _next: NextFunction) {
    const data = validateCreateUser(request.body);

    const user = await this.createUserUseCase.createUser(data);

    return responseSuccess(response, user, 201,  'User created successfully');
  }
}
