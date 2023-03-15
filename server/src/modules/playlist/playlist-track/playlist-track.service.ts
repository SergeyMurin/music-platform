import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PlaylistTrack } from './playlist-track.entity';

@Injectable()
export class PlaylistTrackService {
  constructor(
    @Inject('PLAYLIST_TRACK_REPOSITORY')
    private playlistTrackRepository: typeof PlaylistTrack,
  ) {}

  async findOne(playlist_id, track_id) {
    const playlistTrack = await this.playlistTrackRepository.findOne({
      where: {
        playlist_id,
        track_id,
      },
    });
    if (!playlistTrack) {
      throw new HttpException(
        `Cannot find track ${track_id} in playlist ${playlist_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return playlistTrack;
  }

  async create(playlist_id, track_id) {
    try {
      await PlaylistTrack.create({
        playlist_id,
        track_id,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create PlaylistTrack');
    }
  }

  async remove(playlist_id, track_id) {
    const playlistTrack = await this.findOne(playlist_id, track_id);
    await playlistTrack.destroy();
  }

  async removeAll(id: string) {
    const playlistTracks = await this.playlistTrackRepository.findAll({
      where: { playlist_id: id },
    });
    if (!playlistTracks.length) {
      return;
    }
    return await Promise.all(
      playlistTracks.map(async (playlistTrack) => {
        await playlistTrack.destroy();
      }),
    );
  }

  async getAllTrackIds(id: string) {
    const playlistTracks = await this.playlistTrackRepository.findAll({
      where: { playlist_id: id },
    });
    if (!playlistTracks.length) {
      return [];
    }
    return await Promise.all(
      playlistTracks.map(async (playlistTrack) => {
        return playlistTrack.id;
      }),
    );
  }
}
