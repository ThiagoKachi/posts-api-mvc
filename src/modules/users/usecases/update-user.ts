import { NotFoundError } from '@shared/errors/app-error';
import { IFindUserByIdRepository } from '../interfaces/db/find-user-by-id';
import { IUpdateUserRepository } from '../interfaces/db/update-user';
import { IUpdateUser } from '../interfaces/usecases/update-user';
import { IUpdateUserModel, IUser } from '../models/User';

export class DbUpdateUser implements IUpdateUser {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}

  async updateUser(id: string, userData: IUpdateUserModel): Promise<IUser> {
    const user = await this.findUserByIdRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const newUser = await this.updateUserRepository.updateUser(id, {
      ...user,
      ...userData,
    });

    return newUser;
  }
}
