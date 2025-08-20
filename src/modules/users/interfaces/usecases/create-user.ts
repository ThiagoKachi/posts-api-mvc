import { ICreateUserModel, IUser } from '../../models/User';

export interface ICreateUser {
  createUser(userData: ICreateUserModel): Promise<IUser>;
}
