import { GenreTrack } from '../entities/genreTrackEntity';

export const genreTrackProviders = [
  {
    provide: 'GENRE_TRACK_REPOSITORY',
    useValue: GenreTrack,
  },
];
