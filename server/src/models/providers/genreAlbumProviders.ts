import { GenreAlbum } from '../entities/genreAlbumEntity';

export const genreAlbumProviders = [
  {
    provide: 'GENRE_ALBUM_REPOSITORY',
    useValue: GenreAlbum,
  },
];
