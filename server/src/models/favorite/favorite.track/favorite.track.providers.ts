import { FavoriteTrack } from './favorite.track.entity';

export const favoriteTrackProviders = [
  {
    provide: 'FAVORITE_TRACK_REPOSITORY',
    useValue: FavoriteTrack,
  },
];
