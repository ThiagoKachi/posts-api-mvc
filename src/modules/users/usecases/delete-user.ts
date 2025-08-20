import { NotFoundError } from '@shared/errors/app-error';
import { IDeleteUserRepository } from '../interfaces/db/delete-user';
import { IDeleteUser } from '../interfaces/usecases/delete-user';

export class DbDeleteUser implements IDeleteUser {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository,
  ) {}

  async deleteUser(id: string): Promise<void> {
    const userDeleted = await this.deleteUserRepository.deleteUser(id);

    if (userDeleted === 0) {
      throw new NotFoundError('User not found');
    }

    return;
  }
}
