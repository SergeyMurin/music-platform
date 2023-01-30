import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
