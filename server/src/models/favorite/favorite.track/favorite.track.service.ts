import { Inject, Injectable } from '@nestjs/common';

import { FavoriteTrack } from './favorite.track.entity';

@Injectable()
export class FavoriteTrackService {
  constructor(
    @Inject('FAVORITE_TRACK_REPOSITORY')
    private favoriteTrackRepository: typeof FavoriteTrack,
  ) {}
}
