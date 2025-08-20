import { IUser } from '../../models/User';

export interface IFindUserByIdRepository {
  findUserById(id: string): Promise<IUser | null>;
}
