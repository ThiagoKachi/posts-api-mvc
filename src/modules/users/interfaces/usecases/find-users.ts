import { IUser } from '../../models/User';

export interface IFindUsers {
  findUsers(): Promise<IUser[]>;
}
