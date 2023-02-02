import { UserToken } from './user.token.entity';

export const userTokenProviders = [
  {
    provide: 'USER_TOKEN_REPOSITORY',
    useValue: UserToken,
  },
];
