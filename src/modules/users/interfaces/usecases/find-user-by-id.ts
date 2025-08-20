import { IUser } from '../../models/User';

export interface IFindUserById {
  findUserById(id: string): Promise<IUser | null>;
}
