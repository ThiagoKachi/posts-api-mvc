import { eq } from 'drizzle-orm';
import { posts } from 'src/config/db/schema/schema';
import { db } from 'src/config/main';
import { IFindUserPostsRepository } from '../interfaces/db/find-user-posts';
import { IPost } from '../models/Post';

export class PostDrizzleRepository implements IFindUserPostsRepository {
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
