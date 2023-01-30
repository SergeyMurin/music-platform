import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistTracksService } from './playlist.tracks/playlist.tracks.service';
import { TrackService } from '../track/track.service';
import { Track } from '../track/track.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('PLAYLIST_REPOSITORY')
    private playlistRepository: typeof Playlist,
    private readonly trackService: TrackService,
    private readonly playlistTracksService: PlaylistTracksService,
  ) {}

  async create(request, response) {
    try {
      await Playlist.create({
        name: 'playlist 2',
      });

      response.status(HttpStatus.CREATED).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }
  }

  async add(request, response) {
    try {
      const playlist = await this.playlistRepository.findByPk(
        request.query.playlist_id,
      );
      const track: Track = await this.trackService.getEntityByPK(
        request.query.track_id,
      );
      await this.playlistTracksService.create(playlist.id, track.id);
      response.status(HttpStatus.CREATED).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
