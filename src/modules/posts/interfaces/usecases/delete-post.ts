export interface IDeletePost {
  deletePost(id: string): Promise<void>;
}
