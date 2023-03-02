import { UserRole } from '../entities/userRoleEntity';

export const userRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useValue: UserRole,
  },
];
