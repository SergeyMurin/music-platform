import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { FavoriteTrackService } from './favorite.track.service';

@Controller('favorite-track')
export class FavoriteTrackController {
  constructor(private readonly favoriteTrackService: FavoriteTrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
