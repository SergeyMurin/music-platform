import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { GenreAlbumService } from './genre.album.service';

@Controller('genre-album')
export class GenreAlbumController {
  constructor(private readonly genreAlbumService: GenreAlbumService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
