import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistTrackService } from './playlist.track/playlist.track.service';
import { TrackService } from '../track/track.service';
import { AuthService } from '../user/auth/auth.service';
import { DigitalOceanService } from '../../digtal.ocean/digital.ocean.service';
import process from 'process';
import { AddTrackToPlaylistDto } from './dto/add.track.to.playlist.dto';
import { RemoveTrackFromPlaylistDto } from './dto/remove.track.from.playlist.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('PLAYLIST_REPOSITORY')
    private playlistRepository: typeof Playlist,
    private readonly trackService: TrackService,
    private readonly authService: AuthService,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly playlistTrackService: PlaylistTrackService,
    private readonly userService: UserService,
  ) {}

  async getById(playlistId: string) {
    const playlist = await this.playlistRepository.findByPk(playlistId);
    if (!playlist) {
      throw new HttpException(
        `Cannot found playlist ${playlistId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return playlist;
  }

  async getPlaylistById(playlistId: string) {
    const playlist = await this.getById(playlistId);
    if (!playlist) {
      throw new HttpException(
        `Cannot find album with id ${playlistId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      id: playlist.id,
      title: playlist.title,
      picture_url: playlist.picture_url,
      track_count: playlist.tracks_count,
      user_id: playlist.user_id,
    };
  }

  async getUserPlaylists(userId: string) {
    const playlists = await this.playlistRepository.findAll({
      where: {
        user_id: userId,
      },
    });

    if (!playlists) {
      throw new HttpException(
        `Cannot find any playlists for user ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await Promise.all(
      playlists.map(async (playlist) => {
        return await this.getPlaylistById(playlist.id);
      }),
    );
  }

  async getPlaylistTracks(playlist_id) {
    const playlist = await this.playlistRepository.findByPk(playlist_id);
    return await this.playlistTrackService.getAllTrackIds(playlist.id);
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

  async addTrack(token, dto: AddTrackToPlaylistDto) {
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

  async removeTrack(token: string, dto: RemoveTrackFromPlaylistDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const playlist = await this.getById(dto.id);

    if (user.id !== playlist.user_id) {
      throw new HttpException(
        `User ${user.id} is not playlist ${playlist.id} owner`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.playlistTrackService.remove(playlist.id, dto.track_id);
    playlist.tracks_count--;
    await playlist.save();
  }
}
