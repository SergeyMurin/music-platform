import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';
import { TagAlbumService } from './tag.album.service';

@Controller('tag-album')
export class TagAlbumController {
  constructor(private readonly tagAlbumService: TagAlbumService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  add(@Query() query, @Req() request: Request, @Res() response: Response) {
    this.tagAlbumService.add(query, request, response);
  }
}
