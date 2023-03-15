import { PlaylistTrack } from './playlist-track.entity';

export const playlistTrackProviders = [
  {
    provide: 'PLAYLIST_TRACK_REPOSITORY',
    useValue: PlaylistTrack,
  },
];
