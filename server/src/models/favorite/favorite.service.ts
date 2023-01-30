import { Inject, Injectable } from '@nestjs/common';

import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
  ) {}
}
