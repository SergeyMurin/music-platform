import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { GenreTrackService } from '../services/genreTrackService';

@Controller('genre-track')
export class GenreTrackController {
  constructor(private readonly genreTrackService: GenreTrackService) {}

  @Get()
  async getTrackGenres(@Query('id') track_id) {
    return await this.genreTrackService.getTrackGenres(track_id);
  }
}
