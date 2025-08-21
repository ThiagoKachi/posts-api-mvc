import { BadRequestError } from '@shared/errors/app-error';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { IUpdatePostModel } from '../models/Post';

const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  status: z.string().optional(),
}).strict();

export function validateUpdatePost(data: IUpdatePostModel): IUpdatePostModel {
  const result = updatePostSchema.safeParse(data);

  if (!result.success) {
    const validationError = fromZodError(result.error);

    throw new BadRequestError(validationError.message);
  }

  return result.data;
}

// Não pode editar o author_id
// Somente o autor do post pode editar o post (Pegar o ID do usuário pela URL)
