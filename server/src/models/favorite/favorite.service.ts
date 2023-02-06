import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Favorite } from './favorite.entity';
import { RemoveFavoriteDto } from './dto/remove.favorite.dto';
import { AuthService } from '../user/auth/auth.service';
import { FavoriteTrack } from './favorite.track/favorite.track.entity';
import { FavoriteAlbum } from './favorite.album/favorite.album.entity';
import { UserService } from '../user/user.service';
import { GetFavoriteDto } from './dto/get.favorite.dto';
import { GetFavoritesDto } from './dto/get.favorites.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    @Inject('FAVORITE_TRACK_REPOSITORY')
    private favoriteTrackRepository: typeof FavoriteTrack,
    @Inject('FAVORITE_ALBUM_REPOSITORY')
    private favoriteAlbumRepository: typeof FavoriteAlbum,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async getFavorite(token: string, dto: GetFavoriteDto) {
    const jwtPayload = await this.authService.verifyToken(token);

    const favorite = await this.favoriteRepository.findOne({
      where: {
        id: dto.favorite_id,
      },
    });

    if (!favorite) {
      throw new BadRequestException();
    }

    const favoriteTrack = await this.favoriteTrackRepository.findByPk(
      favorite.id,
    );
    if (favoriteTrack) {
      return {
        type: 'track',
        id: favoriteTrack.id,
        user_id: favorite.user_id,
        track_id: favoriteTrack.track_id,
      };
    }

    const favoriteAlbum = await this.favoriteAlbumRepository.findByPk(
      favorite.id,
    );
    if (favoriteAlbum) {
      return {
        type: 'album',
        id: favoriteAlbum.id,
        user_id: favorite.user_id,
        track_id: favoriteAlbum.album_id,
      };
    }
  }

  async getFavorites(dto: GetFavoritesDto) {
    const favorites = await this.favoriteRepository.findAll({
      where: { user_id: dto.user_id },
      order: [['updatedAt', 'ASC']],
    });
    if (!favorites) {
      return [];
    }

    return Promise.all(
      favorites.map(async (favorite) => {
        const favoriteTrack = await this.favoriteTrackRepository.findOne({
          where: { id: favorite.id },
        });
        if (favoriteTrack) {
          return {
            type: 'track',
            id: favorite.id,
            track_id: favoriteTrack.track_id,
            user_id: dto.user_id,
          };
        }

        const favoriteAlbum = await this.favoriteAlbumRepository.findOne({
          where: { id: favorite.id },
        });
        if (favoriteAlbum) {
          return {
            type: 'album',
            id: favorite.id,
            track_id: favoriteAlbum.album_id,
            user_id: dto.user_id,
          };
        }
      }),
    );
  }

  async remove(token: string, dto: RemoveFavoriteDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);

    const favorite = await this.favoriteRepository.findOne({
      where: {
        user_id: user.id,
        id: dto.favorite_id,
      },
    });
    if (!user || !favorite) {
      throw new BadRequestException();
    }

    const favoriteTrack = await this.favoriteTrackRepository.findByPk(
      favorite.id,
    );
    if (favoriteTrack) {
      await favoriteTrack.destroy();
      await favorite.destroy();
      throw new HttpException('Track deleted', HttpStatus.OK);
    }

    const favoriteAlbum = await this.favoriteAlbumRepository.findByPk(
      favorite.id,
    );
    if (favoriteAlbum) {
      await favoriteAlbum.destroy();
      await favorite.destroy();
      throw new HttpException('Album deleted', HttpStatus.OK);
    }
  }
}
