import { IUpdateUserModel, IUser } from '../../models/User';

export interface IUpdateUser {
  updateUser(id: string, userData: IUpdateUserModel): Promise<IUser>;
}
