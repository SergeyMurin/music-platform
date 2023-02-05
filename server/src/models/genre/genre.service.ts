import { Inject, Injectable } from '@nestjs/common';
import { Genre } from './genre.entity';
import initData from './init/default.json';
import { GetAllGenresDto } from './dto/get.all.genres.dto';

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

  async getAll(): Promise<GetAllGenresDto[]> {
    const genres = await this.genreRepository.findAll({
      order: [['title', 'ASC']],
    });

    return genres.map((genre) => {
      const responseDto = new GetAllGenresDto();
      responseDto.id = genre.id;
      responseDto.title = genre.title;
      return responseDto;
    });
  }
}
