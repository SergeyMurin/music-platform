import { Playlist } from '../entities/playlistEntity';
export const playlistProviders = [
  {
    provide: 'PLAYLIST_REPOSITORY',
    useValue: Playlist,
  },
];
