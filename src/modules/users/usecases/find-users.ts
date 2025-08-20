import { IFindUsersRepository } from '../interfaces/db/find-users';
import { IFindUsers } from '../interfaces/usecases/find-users';
import { IUser } from '../models/User';

export class DbFindUsers implements IFindUsers {
  constructor(private readonly findUsersRepository: IFindUsersRepository) {}

  async findUsers(): Promise<IUser[]> {
    const users = await this.findUsersRepository.findUsers();

    return users;
  }
}
