import { UserModel } from '../../src/utils/interfaces/user';

export const mockUser = (): Pick<UserModel, 'email' | 'password'> => {
  return {
    email: 'mockemail@email.com',
    password: 'mockpassword',
  };
};
