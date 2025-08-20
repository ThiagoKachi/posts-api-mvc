import { BadRequestError } from '@shared/errors/app-error';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { IUpdateUserModel } from '../models/User';

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email('Invalid email format').optional(),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
}).strict();

export function validateUpdateUser(data: IUpdateUserModel): IUpdateUserModel {
  const result = updateUserSchema.safeParse(data);

  if (!result.success) {
    const validationError = fromZodError(result.error);

    throw new BadRequestError(validationError.message);
  }

  return result.data;
}
