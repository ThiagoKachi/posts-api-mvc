export interface IPost {
  id: number;
	author_id: number;
	title: string;
	status: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
}
