import { eq } from 'drizzle-orm';
import { posts, users } from 'src/config/db/schema/schema';
import { db } from 'src/config/main';
import { ICreatePostRepository } from '../interfaces/db/create-post';
import { IDeletePostRepository } from '../interfaces/db/delete-post';
import { IFindPostByIdRepository } from '../interfaces/db/find-post-by-id';
import { IFindPostsRepository } from '../interfaces/db/find-posts';
import { IFindUserPostsRepository } from '../interfaces/db/find-user-posts';
import { IUpdatePostRepository } from '../interfaces/db/update-post';
import { ICreatePostModel, IPost, IUpdatePostModel } from '../models/Post';

export class PostDrizzleRepository implements ICreatePostRepository, IFindPostsRepository, IDeletePostRepository, IUpdatePostRepository, IFindPostByIdRepository, IFindUserPostsRepository {
  async findPostById(id: string): Promise<IPost | null> {
    const [post] = await db.select().from(posts).where(eq(posts.id, Number(id))).leftJoin(users, eq(posts.author_id, users.id));

    if (!post) {
      return null;
    }

    return {
      id: post.posts.id,
      title: post.posts.title,
      content: post.posts.content,
      author_id: post.posts.author_id!,
      status: post.posts.status || 'draft',
      created_at: post.posts.createdAt,
      updated_at: post.posts.updatedAt,
      deleted_at: post.posts.deletedAt,
      author: {
        id: post.users?.id ?? 0,
        name: post.users?.name ?? '',
        email: post.users?.email ?? '',
      },
    };
  }

  async updatePost(id: string, postData: IUpdatePostModel): Promise<IPost> {
    const [updatedPost] = await db.update(posts).set(postData).where(eq(posts.id, Number(id))).returning();

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      author_id: updatedPost.author_id!,
      status: updatedPost.status || 'draft',
      created_at: updatedPost.createdAt,
      updated_at: new Date(),
      deleted_at: null,
    };
  }

  async deletePost(id: string): Promise<number> {
    const post = await db.delete(posts).where(eq(posts.id, Number(id)));

    return post.rowCount ?? 0;
  }

  async findPosts(): Promise<IPost[]> {
    const postsList = await db.select().from(posts);

    return postsList.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author_id: post.author_id!,
      status: post.status || 'draft',
      created_at: post.createdAt,
      updated_at: post.updatedAt,
      deleted_at: post.deletedAt,
    }));
  }

  async add(postData: ICreatePostModel): Promise<IPost> {
    const [newPost] = await db.insert(posts).values(postData).returning();

    return {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      author_id: newPost.author_id!,
      status: newPost.status || 'draft',
      created_at: newPost.createdAt,
      updated_at: newPost.updatedAt,
      deleted_at: newPost.deletedAt,
    };
  }

  async findUserPosts(id: string): Promise<IPost[]> {
    const userPosts = await db.select().from(posts).where(eq(posts.author_id, Number(id)));

    return userPosts
      .filter(post => post.author_id !== null)
      .map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        author_id: post.author_id!,
        status: post.status || 'draft',
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        deleted_at: post.deletedAt,
      }));
  }
}
