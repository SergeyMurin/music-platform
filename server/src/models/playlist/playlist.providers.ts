import { Playlist } from './playlist.entity';
export const playlistProviders = [
  {
    provide: 'PLAYLIST_REPOSITORY',
    useValue: Playlist,
  },
];
