import { Genre } from './genre.entity';

export const genreProviders = [
  {
    provide: 'GENRE_REPOSITORY',
    useValue: Genre,
  },
];
