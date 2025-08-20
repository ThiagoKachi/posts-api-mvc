import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { CreateUserController } from '../controllers/create-user-controller';
import { DbCreateUser } from '../usecases/create-user';

export const makeCreateUserControllerRepository = () => {
  const userRepository = new UserDrizzleRepository();
  const userService = new DbCreateUser(userRepository, userRepository);
  const createUserController = new CreateUserController(userService);

  return createUserController;
};
