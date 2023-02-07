import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { FavoriteTrack } from './favorite.track.entity';
import { CreateFavoriteTrackDto } from './dto/create.favorite.track.dto';
import { Favorite } from '../favorite.entity';
import { AuthService } from '../../user/auth/auth.service';
import { UserService } from '../../user/user.service';
import { TrackService } from '../../track/track.service';

@Injectable()
export class FavoriteTrackService {
  constructor(
    @Inject('FAVORITE_TRACK_REPOSITORY')
    private favoriteTrackRepository: typeof FavoriteTrack,
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly trackService: TrackService,
  ) {}

  async isFavoriteTrackExists(
    user_id: string,
    track_id: string,
  ): Promise<FavoriteTrack> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user_id,
      },
    });
    if (!favorite) {
      return null;
    }

    return await this.favoriteTrackRepository.findOne({
      where: {
        id: favorite.id,
        track_id,
      },
    });
  }

  async create(token: string, dto: CreateFavoriteTrackDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const track = await this.trackService.getTrackById(dto.track_id);
    if (!user || !track) {
      throw new BadRequestException();
    }

    const favorite = await this.favoriteRepository.create({
      user_id: user.id,
    });
    if (await this.isFavoriteTrackExists(user.id, track.id)) {
      await favorite.destroy();
      throw new BadRequestException();
    }

    const favoriteTrack = await this.favoriteTrackRepository.create({
      id: favorite.id,
      track_id: track.id,
    });
    user.favorites_count++;
    await user.save();
    return {
      id: favoriteTrack.id,
      track_id: favoriteTrack.id,
      user_id: favorite.user_id,
    };
  }
}
