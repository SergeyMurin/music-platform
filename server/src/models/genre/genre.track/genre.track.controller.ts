import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { GenreTrackService } from './genre.track.service';

@Controller('genre-track')
export class GenreTrackController {
  constructor(private readonly genreTrackService: GenreTrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
