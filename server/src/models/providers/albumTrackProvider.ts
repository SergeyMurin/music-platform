import { AlbumTrack } from '../entities/albumTrackEntity';

export const albumTrackProvider = [
  {
    provide: 'ALBUM_TRACK_REPOSITORY',
    useValue: AlbumTrack,
  },
];
