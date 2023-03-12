import { Controller, Get } from '@nestjs/common';
import { GenreService } from '../services/genreService';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/all')
  async getAll() {
    return await this.genreService.getAll();
  }
}
