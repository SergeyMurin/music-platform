import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { FavoriteAlbum } from './favorite.album.entity';
import { Favorite } from '../favorite.entity';
import { UserService } from '../../user/user.service';
import { FavoriteTrack } from '../favorite.track/favorite.track.entity';
import { CreateFavoriteTrackDto } from '../favorite.track/dto/create.favorite.track.dto';
import { CreateFavoriteAlbumDto } from './dto/create.favorite.album.dto';
import { AuthService } from '../../user/auth/auth.service';
import { AlbumService } from '../../album/album.service';

@Injectable()
export class FavoriteAlbumService {
  constructor(
    @Inject('FAVORITE_ALBUM_REPOSITORY')
    private favoriteAlbumRepository: typeof FavoriteAlbum,
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
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

  async isFavoriteAlbumExists(
    user_id: string,
    album_id: string,
  ): Promise<FavoriteAlbum> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user_id,
      },
    });
    if (!favorite) {
      return null;
    }

    return await this.favoriteAlbumRepository.findOne({
      where: {
        id: favorite.id,
        album_id,
      },
    });
  }

  async create(token: string, dto: CreateFavoriteAlbumDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.albumService.getById(dto.album_id);
    if (!user || !album) {
      throw !user
        ? new HttpException(
            `Cannot found user ${jwtPayload.user_id}`,
            HttpStatus.NOT_FOUND,
          )
        : new HttpException(
            `Cannot find album ${dto.album_id}`,
            HttpStatus.NOT_FOUND,
          );
    }

    const favorite = await this.favoriteRepository.create({
      user_id: user.id,
    });
    if (await this.isFavoriteAlbumExists(user.id, album.id)) {
      await favorite.destroy();
      throw new BadRequestException(`Album ${album.id} is already favorite`);
    }

    const favoriteAlbum = await this.favoriteAlbumRepository.create({
      id: favorite.id,
      album_id: album.id,
    });
    user.favorites_count++;
    await user.save();
    return {
      id: favoriteAlbum.id,
      album_id: favoriteAlbum.id,
      user_id: favorite.user_id,
    };
  }
}
