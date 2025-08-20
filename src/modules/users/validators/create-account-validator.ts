import { BadRequestError } from '@shared/errors/app-error';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ICreateUserModel } from '../models/User';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
}).strict();

export function validateCreateUser(data: ICreateUserModel): ICreateUserModel {
  const result = createUserSchema.safeParse(data);

  if (!result.success) {
    const validationError = fromZodError(result.error);

    throw new BadRequestError(validationError.message);
  }

  return result.data;
}
