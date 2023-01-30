import { Inject, Injectable } from '@nestjs/common';

import { GenreTrack } from './genre.track.entity';

@Injectable()
export class GenreTrackService {
  constructor(
    @Inject('GENRE_TRACK_REPOSITORY')
    private genreTrackRepository: typeof GenreTrack,
  ) {}
}
