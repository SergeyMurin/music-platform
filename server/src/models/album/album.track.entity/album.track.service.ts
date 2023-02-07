import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AlbumTrack } from './album.track.entity';

@Injectable()
export class AlbumTrackService {
  constructor(
    @Inject('ALBUM_TRACK_REPOSITORY')
    private albumTrackRepository: typeof AlbumTrack,
  ) {}

  async create(album_id, track_id) {
    try {
      await AlbumTrack.create({
        album_id,
        track_id,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create PlaylistTrack');
    }
  }
}
