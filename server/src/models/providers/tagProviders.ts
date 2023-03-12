import { Tag } from '../entities/tagEntity';

export const tagProviders = [
  {
    provide: 'TAG_REPOSITORY',
    useValue: Tag,
  },
];
