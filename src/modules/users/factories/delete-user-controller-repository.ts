import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { DeleteUserController } from '../controllers/delete-user-controller';
import { DbDeleteUser } from '../usecases/delete-user';

export const makeDeleteUserControllerRepository = () => {
  const userRepository = new UserDrizzleRepository();
  const userService = new DbDeleteUser(userRepository);
  const deleteUserController = new DeleteUserController(userService);

  return deleteUserController;
};
