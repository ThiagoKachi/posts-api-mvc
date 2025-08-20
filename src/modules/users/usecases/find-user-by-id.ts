import { NotFoundError } from '@shared/errors/app-error';
import { IFindUserByIdRepository } from '../interfaces/db/find-user-by-id';
import { IFindUserById } from '../interfaces/usecases/find-user-by-id';
import { IUser } from '../models/User';

export class DbFindUserById implements IFindUserById {
  constructor(private readonly findUserByIdRepository: IFindUserByIdRepository) {}

  async findUserById(id: string): Promise<IUser | null> {
    const user = await this.findUserByIdRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
