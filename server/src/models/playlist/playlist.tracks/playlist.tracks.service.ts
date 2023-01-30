import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PlaylistTracks } from './playlist.tracks.entity';

@Injectable()
export class PlaylistTracksService {
  constructor(
    @Inject('PLAYLIST_TRACKS_REPOSITORY')
    private playlistTracksRepository: typeof PlaylistTracks,
  ) {}

  async create(playlist_id, track_id) {
    try {
      await PlaylistTracks.create({
        playlist_id,
        track_id,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
