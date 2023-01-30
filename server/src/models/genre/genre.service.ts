import { Inject, Injectable } from '@nestjs/common';
import { Genre } from './genre.entity';
import initData from './init/default.json';

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
    const genres = initData.genres;
    for (const genre of genres) {
      await this.genreRepository.create({
        title: genre,
      });
    }
  }
}
