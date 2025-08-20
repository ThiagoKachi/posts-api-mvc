import { ConflictError } from '@shared/errors/app-error';
import { ICreateUserRepository } from '../interfaces/db/create-user';
import { IFindUserByEmailRepository } from '../interfaces/db/find-user-by-email';
import { ICreateUser } from '../interfaces/usecases/create-user';
import { IUser } from '../models/User';

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly createUserRepository: ICreateUserRepository,
  ) {}

  async createUser(userData: IUser): Promise<IUser> {
    const user = await this.findUserByEmailRepository.findByEmail(userData.email);

    if (user) {
      throw new ConflictError('User already exists');
    }

    const newUser = await this.createUserRepository.add(userData);

    return newUser;
  }
}
