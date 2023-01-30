import { PlaylistTracks } from './playlist.tracks.entity';

export const playlistTracksProviders = [
  {
    provide: 'PLAYLIST_TRACKS_REPOSITORY',
    useValue: PlaylistTracks,
  },
];
