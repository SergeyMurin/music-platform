import { Controller, Get, Req, Res } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('/all')
  async getAll() {
    return await this.genreService.getAll();
  }
}
