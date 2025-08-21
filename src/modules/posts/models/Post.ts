import { IUser } from 'src/modules/users/models/User';

export interface IPost {
  id: number;
	author_id: number;
	title: string;
	status: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	author?: Pick<IUser, 'id' | 'name' | 'email'>;
}

export interface ICreatePostModel {
	author_id: number;
	title: string;
	content: string;
}

export interface IUpdatePostModel {
	title?: string;
	content?: string;
	status?: string;
}
