import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { FindUserByIdController } from '../controllers/find-user-by-id-controller';
import { DbFindUserById } from '../usecases/find-user-by-id';

export const makeFindUserByIdControllerRepository = () => {
  const userRepository = new UserDrizzleRepository();
  const userService = new DbFindUserById(userRepository);
  const findUserByIdController = new FindUserByIdController(userService);

  return findUserByIdController;
};
