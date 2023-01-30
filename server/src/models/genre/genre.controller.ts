import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
