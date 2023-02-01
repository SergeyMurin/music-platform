import { Inject, Injectable } from '@nestjs/common';
import { Genre } from './genre.entity';
import initData from './init/default.json';
import { updateInitJSON } from '../../shared/updateInitJSON';

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
}
