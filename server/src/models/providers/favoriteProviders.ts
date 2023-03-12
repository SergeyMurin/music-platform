import { Favorite } from '../entities/favoriteEntity';

export const favoriteProviders = [
  {
    provide: 'FAVORITE_REPOSITORY',
    useValue: Favorite,
  },
];
