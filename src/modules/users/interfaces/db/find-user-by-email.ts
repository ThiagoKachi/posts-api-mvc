import { IUser } from '../../models/User';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
