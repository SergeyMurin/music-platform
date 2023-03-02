import { Role } from '../entities/roleEntity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
  },
];
