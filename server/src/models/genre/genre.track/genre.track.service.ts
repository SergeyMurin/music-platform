import { Inject, Injectable } from '@nestjs/common';

import { GenreTrack } from './genre.track.entity';
import { AlbumGenresDto } from '../genre.album/dto/album.genres.dto';
import { Track } from '../../track/track.entity';
import { TrackGenresDto } from './dto/track.genres.dto';

@Injectable()
export class GenreTrackService {
  constructor(
    @Inject('GENRE_TRACK_REPOSITORY')
    private genreTrackRepository: typeof GenreTrack,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
  ) {}

  async find(genre_id, track_id): Promise<GenreTrack> {
    return await this.genreTrackRepository.findOne({
      where: { genre_id, track_id },
    });
  }

  async create(genre_id, track_id): Promise<GenreTrack> {
    if (await this.find(genre_id, track_id)) {
      return;
    }
    await this.genreTrackRepository.create({
      genre_id,
      track_id,
    });
  }

  async getTrackGenres(track_id: string): Promise<Promise<TrackGenresDto>[]> {
    const trackGenres = await this.genreTrackRepository.findAll({
      where: { track_id },
    });
    return trackGenres.map(async (trackGenre) => {
      const responseDto = new TrackGenresDto();
      responseDto.id = trackGenre.genre_id;
      const genre = await this.trackRepository.findOne({
        where: { id: trackGenre.genre_id },
      });
      responseDto.title = genre.title;
      return responseDto;
    });
  }
}
