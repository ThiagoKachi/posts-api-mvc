export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<number>;
}
