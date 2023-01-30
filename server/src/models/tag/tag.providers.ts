import { Tag } from './tag.entity';

export const tagProviders = [
  {
    provide: 'TAG_REPOSITORY',
    useValue: Tag,
  },
];
