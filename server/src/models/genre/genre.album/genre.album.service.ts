import { Inject, Injectable } from '@nestjs/common';
import { GenreAlbum } from './genre.album.entity';

import { Genre } from '../genre.entity';
import { AlbumGenresDto } from './dto/album.genres.dto';

@Injectable()
export class GenreAlbumService {
  constructor(
    @Inject('GENRE_ALBUM_REPOSITORY')
    private genreAlbumRepository: typeof GenreAlbum,
    @Inject('GENRE_REPOSITORY')
    private genreRepository: typeof Genre,
  ) {}

  async find(genre_id, album_id): Promise<GenreAlbum> {
    return await this.genreAlbumRepository.findOne({
      where: { genre_id, album_id },
    });
  }

  async create(genre_id, album_id): Promise<GenreAlbum> {
    if (await this.find(genre_id, album_id)) {
      return;
    }
    await this.genreAlbumRepository.create({
      genre_id,
      album_id,
    });
  }

  async getAlbumGenres(album_id: string): Promise<Promise<AlbumGenresDto>[]> {
    const albumGenres = await this.genreAlbumRepository.findAll({
      where: { album_id },
    });
    return albumGenres.map(async (albumGenre) => {
      const responseDto = new AlbumGenresDto();
      responseDto.id = albumGenre.genre_id;
      const genre = await this.genreRepository.findOne({
        where: { id: albumGenre.genre_id },
      });
      responseDto.title = genre.title;
      return responseDto;
    });
  }
}
