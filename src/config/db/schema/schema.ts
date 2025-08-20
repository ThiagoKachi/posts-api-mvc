import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  bio: text('bio'),
  avatar_url: text('avatar_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey().unique(),
  author_id: integer('author_id').references(() => users.id),
  title: text('title').notNull(),
  status: text('status').default('draft'),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
