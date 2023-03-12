import { FavoriteTrack } from '../entities/favoriteTrackEntity';

export const favoriteTrackProviders = [
  {
    provide: 'FAVORITE_TRACK_REPOSITORY',
    useValue: FavoriteTrack,
  },
];
