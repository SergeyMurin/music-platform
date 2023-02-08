import { Inject, Injectable } from '@nestjs/common';

import { FavoriteAlbum } from './favorite.album.entity';
import { Favorite } from '../favorite.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class FavoriteAlbumService {
  constructor(
    @Inject('FAVORITE_ALBUM_REPOSITORY')
    private favoriteAlbumRepository: typeof FavoriteAlbum,
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    private readonly userService: UserService,
  ) {}

  async removeAlbumFavorites(album_id: string) {
    const albumFavorites = await this.favoriteAlbumRepository.findAll({
      where: { album_id },
    });
    if (albumFavorites.length) {
      await Promise.all(
        albumFavorites.map(async (albumFavorite) => {
          const favorite = await this.favoriteRepository.findByPk(
            albumFavorite.id,
          );
          const user = await this.userService.getById(favorite.user_id);
          user.favorites_count--;
          await favorite.destroy();
          await albumFavorite.destroy();
        }),
      );
    }
  }
}
