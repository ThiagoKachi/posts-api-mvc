import { UserDrizzleRepository } from '../../users/repositories/user-drizzle-repository';
import { FindUsersController } from '../controllers/find-users-controller';
import { DbFindUsers } from '../usecases/find-users';

export const makeFindUsersControllerRepository = () => {
  const userRepository = new UserDrizzleRepository();
  const userService = new DbFindUsers(userRepository);
  const findUsersController = new FindUsersController(userService);

  return findUsersController;
};
