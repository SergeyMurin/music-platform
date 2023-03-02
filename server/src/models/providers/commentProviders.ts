import { Comment } from '../entities/commentEntity';

export const commentProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useValue: Comment,
  },
];
