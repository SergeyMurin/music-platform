import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { FavoriteTrack } from '../entities/favoriteTrackEntity';
import { CreateFavoriteTrackDTO } from '../DTO/favoriteTrack/createFavoriteTrackDTO';
import { Favorite } from '../entities/favoriteEntity';
import { AuthService } from './authService';
import { UserService } from './userService';
import { TrackService } from './trackService';

@Injectable()
export class FavoriteTrackService {
  constructor(
    @Inject('FAVORITE_TRACK_REPOSITORY')
    private favoriteTrackRepository: typeof FavoriteTrack,
    @Inject('FAVORITE_REPOSITORY')
    private favoriteRepository: typeof Favorite,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => TrackService))
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

  async create(token: string, dto: CreateFavoriteTrackDTO) {
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
    track.likes++;
    await track.save();
    await user.save();
    return {
      id: favoriteTrack.id,
      track_id: favoriteTrack.id,
      user_id: favorite.user_id,
    };
  }

  async removeTrackFavorites(track_id: string) {
    const trackFavorites = await this.favoriteTrackRepository.findAll({
      where: { track_id },
    });
    if (trackFavorites.length) {
      await Promise.all(
        trackFavorites.map(async (trackFavorite) => {
          const track = await this.trackService.getTrackById(
            trackFavorite.track_id,
          );
          const favorite = await this.favoriteRepository.findByPk(
            trackFavorite.id,
          );
          const user = await this.userService.getById(favorite.user_id);
          user.favorites_count--;
          track.likes--;
          await user.save();
          await favorite.destroy();
          await trackFavorite.destroy();
        }),
      );
    }
  }
}
