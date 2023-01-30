import { GenreTrack } from './genre.track.entity';

export const genreTrackProviders = [
  {
    provide: 'GENRE_TRACK_REPOSITORY',
    useValue: GenreTrack,
  },
];
