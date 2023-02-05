import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { GenreAlbumService } from './genre.album.service';

@Controller('genre-album')
export class GenreAlbumController {
  constructor(private readonly genreAlbumService: GenreAlbumService) {}

  @Get()
  async getAlbumGenres(@Query('id') album_id) {
    return await this.genreAlbumService.getAlbumGenres(album_id);
  }
}
