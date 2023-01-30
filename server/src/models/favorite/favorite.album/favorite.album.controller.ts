import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { FavoriteAlbumService } from './favorite.album.service';

@Controller('favorite-album')
export class FavoriteAlbumController {
  constructor(private readonly favoriteAlbumService: FavoriteAlbumService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
