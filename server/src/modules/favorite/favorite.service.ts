import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Favorite } from './favorite.entity';
import { RemoveFavoritesDto } from '../../common/dto/favorite/remove-favorites.dto';
import { AuthService } from '../auth/auth.service';
import { FavoriteTrack } from './favorite-track/favorite-track.entity';
import { FavoriteAlbum } from './favorite-album/favorite-album.entity';
import { UserService } from '../user/user.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    @Inject('FAVORITE_TRACK_REPOSITORY')
    private favoriteTrackRepository: typeof FavoriteTrack,
    @Inject('FAVORITE_ALBUM_REPOSITORY')
    private favoriteAlbumRepository: typeof FavoriteAlbum,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async getFavorite(token: string, favoriteId: string) {
    const jwtPayload = await this.authService.verifyToken(token);

    const favorite = await this.favoriteRepository.findOne({
      where: {
        id: favoriteId,
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

  async getFavorites(userId: string) {
    const favorites = await this.favoriteRepository.findAll({
      where: { user_id: userId },
      order: [['updatedAt', 'DESC']],
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
          const track = await this.trackService.getTrackById(
            favoriteTrack.track_id,
          );
          return {
            favorite_id: favoriteTrack.id,
            type: 'track',
            ...track.dataValues,
          };
        }

        const favoriteAlbum = await this.favoriteAlbumRepository.findOne({
          where: { id: favorite.id },
        });
        if (favoriteAlbum) {
          const album = await this.albumService.getById(favoriteAlbum.album_id);
          return {
            type: 'album',
            favorite_id: favoriteAlbum.id,
            ...album.dataValues,
          };
        }
      }),
    );
  }

  async remove(token: string, dto: RemoveFavoritesDto) {
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
      const track = await this.trackService.getTrackById(
        favoriteTrack.track_id,
      );
      await favoriteTrack.destroy();
      await favorite.destroy();
      user.favorites_count--;
      track.likes--;
      await track.save();
      await user.save();
      throw new HttpException('Track deleted', HttpStatus.OK);
    }

    const favoriteAlbum = await this.favoriteAlbumRepository.findByPk(
      favorite.id,
    );
    if (favoriteAlbum) {
      const album = await this.albumService.getById(favoriteAlbum.album_id);
      await favoriteAlbum.destroy();
      await favorite.destroy();
      user.favorites_count--;
      album.likes--;
      await user.save();
      throw new HttpException('Album deleted', HttpStatus.OK);
    }
  }
}
