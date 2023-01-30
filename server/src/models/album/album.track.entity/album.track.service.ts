import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AlbumTrack } from './album.track.entity';

@Injectable()
export class AlbumTrackService {
  constructor(
    @Inject('ALBUM_TRACK_REPOSITORY')
    private albumTrackRepository: typeof AlbumTrack,
  ) {}
}
