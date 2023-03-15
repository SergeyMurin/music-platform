import { Repost } from './repost.entity';

export const repostProviders = [
  {
    provide: 'REPOST_REPOSITORY',
    useValue: Repost,
  },
];
