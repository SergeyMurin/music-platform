import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PlaylistTrack } from './playlist.track.entity';

@Injectable()
export class PlaylistTrackService {
  constructor(
    @Inject('PLAYLIST_TRACK_REPOSITORY')
    private playlistTrackRepository: typeof PlaylistTrack,
  ) {}

  async create(playlist_id, track_id) {
    try {
      await PlaylistTrack.create({
        playlist_id,
        track_id,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
