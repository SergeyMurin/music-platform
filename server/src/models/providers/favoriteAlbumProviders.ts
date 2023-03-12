import { FavoriteAlbum } from '../entities/favoriteAlbumEntity';

export const favoriteAlbumProviders = [
  {
    provide: 'FAVORITE_ALBUM_REPOSITORY',
    useValue: FavoriteAlbum,
  },
];
