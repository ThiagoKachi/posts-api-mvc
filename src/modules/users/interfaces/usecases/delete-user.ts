export interface IDeleteUser {
  deleteUser(id: string): Promise<void>;
}
