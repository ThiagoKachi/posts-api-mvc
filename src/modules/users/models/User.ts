export interface IUser {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  posts?: any[];
}

export interface ICreateUserModel {
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
}

export interface IUpdateUserModel {
  name?: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
}
