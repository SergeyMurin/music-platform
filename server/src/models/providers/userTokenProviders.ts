import { UserToken } from '../entities/userTokenEntity';

export const userTokenProviders = [
  {
    provide: 'USER_TOKEN_REPOSITORY',
    useValue: UserToken,
  },
];
