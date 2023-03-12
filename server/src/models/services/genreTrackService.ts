import { Inject, Injectable } from '@nestjs/common';

import { GenreTrack } from '../entities/genreTrackEntity';
import { AlbumGenresDTO } from '../DTO/genreAlbum/albumGenresDTO';
import { Track } from '../entities/trackEntity';
import { TrackGenresDTO } from '../DTO/genreTrack/trackGenresDTO';
import { Genre } from '../entities/genreEntity';

@Injectable()
export class GenreTrackService {
  constructor(
    @Inject('GENRE_TRACK_REPOSITORY')
    private genreTrackRepository: typeof GenreTrack,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,

    @Inject('GENRE_REPOSITORY')
    private genreRepository: typeof Genre,
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

  async getTrackGenres(track_id: string): Promise<Awaited<TrackGenresDTO>[]> {
    const trackGenres = await this.genreTrackRepository.findAll({
      where: { track_id },
    });
    return await Promise.all(
      trackGenres.map(async (trackGenre) => {
        const responseDto = new TrackGenresDTO();
        responseDto.id = trackGenre.genre_id;
        const genre = await this.genreRepository.findOne({
          where: { id: trackGenre.genre_id },
        });
        responseDto.title = genre.title;
        return responseDto;
      }),
    );
  }
}
