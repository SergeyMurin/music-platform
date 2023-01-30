import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { RepostAlbumService } from './repost.album.service';

@Controller('repost-album')
export class RepostAlbumController {
  constructor(private readonly repostAlbumService: RepostAlbumService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
