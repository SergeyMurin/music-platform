import { Genre } from '../entities/genreEntity';

export const genreProviders = [
  {
    provide: 'GENRE_REPOSITORY',
    useValue: Genre,
  },
];
