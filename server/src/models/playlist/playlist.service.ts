import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistTrackService } from './playlist.track/playlist.track.service';
import { TrackService } from '../track/track.service';
import { Track } from '../track/track.entity';
import { AuthService } from '../user/auth/auth.service';
import { DigitalOceanService } from '../../digtal.ocean/digital.ocean.service';
import process from 'process';
import { AddTrackDto } from './dto/add.track.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('PLAYLIST_REPOSITORY')
    private playlistRepository: typeof Playlist,
    private readonly trackService: TrackService,
    private readonly playlistTracksService: PlaylistTrackService,
    private readonly authService: AuthService,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly playlistTrackService: PlaylistTrackService,
  ) {}

  async getById(id: string) {
    return await this.playlistRepository.findByPk(id);
  }

  async create(token, files, dto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const playlist = await this.playlistRepository.create({
      title: dto.title,
      user_id: jwtPayload.user_id,
      tracks_count: 0,
    });

    let pictureUrl = null;
    if (files.picture) {
      pictureUrl = await this.digitalOceanService.uploadFile(
        files.picture[0].buffer,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_PLAYLIST_PATH + playlist.id,
      );
    }

    if (!pictureUrl) {
      playlist.picture_url =
        process.env.DIGITAL_OCEAN_HREF +
        '/' +
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH_DEFAULT;
    } else playlist.picture_url = pictureUrl;

    await playlist.save();
    return {
      id: playlist.id,
      title: playlist.title,
      user_id: playlist.user_id,
    };
  }

  async addTrack(token, files, dto: AddTrackDto) {
    const jwtPayload = await this.authService.verifyToken(token);

    const playlist = await this.getById(dto.playlist_id);
    if (playlist.user_id !== jwtPayload.user_id) {
      throw new HttpException(
        `User ${jwtPayload.user_id} cannot add track to playlist ${dto.playlist_id} `,
        HttpStatus.BAD_REQUEST,
      );
    } else if (!playlist) {
      throw new HttpException(
        `Cannot find playlist ${dto.playlist_id} of user ${jwtPayload.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const track = await this.trackService.getTrackById(dto.track_id);
    if (!track) {
      throw new HttpException(
        `Cannot find track ${dto.track_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.playlistTrackService.create(playlist.id, track.id);
    playlist.tracks_count++;
    await playlist.save();
    return {
      id: playlist.id,
      track_id: track.id,
      user_id: jwtPayload.user_id,
    };
  }
}
