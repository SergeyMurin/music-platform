import { Inject, Injectable } from '@nestjs/common';

import { FavoriteAlbum } from './favorite.album.entity';

@Injectable()
export class FavoriteAlbumService {
  constructor(
    @Inject('FAVORITE_ALBUM_REPOSITORY')
    private favoriteAlbumRepository: typeof FavoriteAlbum,
  ) {}
}
