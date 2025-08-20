import { eq } from 'drizzle-orm';
import { users } from 'src/config/db/schema/schema';
import { db } from 'src/config/main';
import { ICreateUserRepository } from '../interfaces/db/create-user';
import { IDeleteUserRepository } from '../interfaces/db/delete-user';
import { IFindUserByEmailRepository } from '../interfaces/db/find-user-by-email';
import { IFindUserByIdRepository } from '../interfaces/db/find-user-by-id';
import { IFindUsersRepository } from '../interfaces/db/find-users';
import { IUpdateUserRepository } from '../interfaces/db/update-user';
import { ICreateUserModel, IUpdateUserModel, IUser } from '../models/User';

export class UserDrizzleRepository implements ICreateUserRepository, IFindUserByEmailRepository, IFindUsersRepository, IFindUserByIdRepository, IDeleteUserRepository, IUpdateUserRepository {
  async updateUser(id: string, userData: IUpdateUserModel): Promise<IUser> {
    const [user] = await db.update(users).set(userData).where(eq(users.id, Number(id))).returning();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      deletedAt: user.deletedAt ?? null,
    };
  }

  async deleteUser(id: string): Promise<number> {
    const user = await db.delete(users).where(eq(users.id, Number(id)));

    return user.rowCount ?? 0;
  }

  async findUserById(id: string): Promise<IUser | null> {
    const [user] = await db.select().from(users).where(eq(users.id, Number(id)));

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }

  async findUsers(): Promise<IUser[]> {
    const usersList = await db.select().from(users);

    return usersList.map((user) => ({
      ...user,
      bio: user.bio ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
    }));
  }

  async add(userData: ICreateUserModel): Promise<IUser> {
    const [user] = await db.insert(users).values(userData).returning();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio ?? undefined,
      avatar_url: user.avatar_url ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }
}
