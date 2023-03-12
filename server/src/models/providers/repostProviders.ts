import { Repost } from '../entities/repostEntity';

export const repostProviders = [
  {
    provide: 'REPOST_REPOSITORY',
    useValue: Repost,
  },
];
