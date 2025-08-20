import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { UpdateUserController } from '../controllers/update-user-controller';
import { DbUpdateUser } from '../usecases/update-user';

export const makeUpdateUserControllerRepository = () => {
  const userRepository = new UserDrizzleRepository();
  const userService = new DbUpdateUser(userRepository, userRepository);
  const updateUserController = new UpdateUserController(userService);

  return updateUserController;
};
