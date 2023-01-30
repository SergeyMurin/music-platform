import { FavoriteAlbum } from './favorite.album.entity';

export const favoriteAlbumProviders = [
  {
    provide: 'FAVORITE_ALBUM_REPOSITORY',
    useValue: FavoriteAlbum,
  },
];
