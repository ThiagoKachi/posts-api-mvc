import { IUser } from '../../models/User';

export interface IFindUsersRepository {
  findUsers(): Promise<IUser[]>;
}
