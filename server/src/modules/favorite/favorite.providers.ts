import { Favorite } from './favorite.entity';

export const favoriteProviders = [
  {
    provide: 'FAVORITE_REPOSITORY',
    useValue: Favorite,
  },
];
