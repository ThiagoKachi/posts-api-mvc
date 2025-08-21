import { IPost } from '../../models/Post';

export interface IFindPostById {
  findPostById(id: string): Promise<IPost | null>;
}
