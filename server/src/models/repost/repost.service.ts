import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Repost } from './repost.entity';
import { CreateTrackRepostDto } from './dto/create.track.repost.dto';
import { AuthService } from '../user/auth/auth.service';
import { UserService } from '../user/user.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { CreateAlbumRepostDto } from './dto/create.album.repost.dto';
import { RemoveRepostDto } from './dto/remove.repost.dto';

@Injectable()
export class RepostService {
  constructor(
    @Inject('REPOST_REPOSITORY')
    private repostRepository: typeof Repost,
    private authService: AuthService,
    private userService: UserService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  async getById(id: string): Promise<Repost> {
    const repost = await this.repostRepository.findByPk(id);
    if (!repost) {
      throw new HttpException(`Cannot find repost ${id}`, HttpStatus.NOT_FOUND);
    }
    return repost;
  }

  async createTrackRepost(token: string, dto: CreateTrackRepostDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const track = await this.trackService.getTrackById(dto.id);

    const repost = await this.repostRepository.create({
      user_id: user.id,
      author_user_id: track.user_id,
      track_id: track.id,
    });

    user.reposts_count++;
    await user.save();

    return {
      id: repost.id,
      user_id: repost.user_id,
      author_user_id: repost.author_user_id,
      track_id: repost.track_id,
      type: 'track',
      created_at: repost.createdAt,
      updated_at: repost.updatedAt,
    };
  }

  async createAlbumRepost(token: string, dto: CreateAlbumRepostDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.albumService.getById(dto.id);

    const repost = await this.repostRepository.create({
      user_id: user.id,
      author_user_id: album.user_id,
      album_id: album.id,
    });

    user.reposts_count++;
    await user.save();

    return {
      id: repost.id,
      user_id: repost.user_id,
      author_user_id: repost.author_user_id,
      album_id: repost.track_id,
      type: 'album',
      created_at: repost.createdAt,
      updated_at: repost.updatedAt,
    };
  }

  async remove(token: any, dto: RemoveRepostDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const repost = await this.getById(dto.id);

    if (user.id === repost.id) {
      throw new HttpException(
        `User ${user.id} is not repost ${repost.id} owner`,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.reposts_count--;
    await user.save();
    await repost.destroy();
  }
}
