import { Inject, Injectable } from '@nestjs/common';
import { Genre } from '../entities/genreEntity';
import initData from '../init/defaultGenres.json';
import { GetAllGenresDTO } from '../DTO/genre/getAllGenresDTO';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY')
    private genreRepository: typeof Genre,
    @Inject('SEQUELIZE')
    private sequelize,
  ) {
    sequelize.sync().then(() => this.init());
  }

  async init() {
    if (await this.genreRepository.findOne()) {
      return;
    }
    const genres = initData;
    for (const genre of genres) {
      await this.genreRepository.create({
        title: genre,
      });
    }
  }

  async getAll(): Promise<GetAllGenresDTO[]> {
    const genres = await this.genreRepository.findAll({
      order: [['title', 'ASC']],
    });

    return genres.map((genre) => {
      const responseDto = new GetAllGenresDTO();
      responseDto.id = genre.id;
      responseDto.title = genre.title;
      return responseDto;
    });
  }
}
