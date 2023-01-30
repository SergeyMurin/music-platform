import { AlbumTrack } from './album.track.entity';

export const albumTrackProviders = [
  {
    provide: 'ALBUM_TRACK_REPOSITORY',
    useValue: AlbumTrack,
  },
];
