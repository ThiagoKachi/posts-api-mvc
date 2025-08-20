import { IUpdateUserModel, IUser } from '../../models/User';

export interface IUpdateUserRepository {
  updateUser(id: string, userData: IUpdateUserModel): Promise<IUser>;
}
