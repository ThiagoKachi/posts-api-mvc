import { ICreateUserModel, IUser } from '../../models/User';

export interface ICreateUserRepository {
  add(userData: ICreateUserModel): Promise<IUser>;
}
