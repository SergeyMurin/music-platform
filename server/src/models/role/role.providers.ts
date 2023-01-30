import { Role } from './role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
  },
];
