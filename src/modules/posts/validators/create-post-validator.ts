import { BadRequestError } from '@shared/errors/app-error';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ICreatePostModel } from '../models/Post';

const createPostSchema = z.object({
  author_id: z.number().min(1, 'Author ID is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
}).strict();

export function validateCreatePost(data: ICreatePostModel): ICreatePostModel {
  const result = createPostSchema.safeParse(data);

  if (!result.success) {
    const validationError = fromZodError(result.error);

    throw new BadRequestError(validationError.message);
  }

  return result.data;
}
