import { GenreAlbum } from './genre.album.entity';

export const genreAlbumProviders = [
  {
    provide: 'GENRE_ALBUM_REPOSITORY',
    useValue: GenreAlbum,
  },
];
