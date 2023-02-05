import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { TagAlbumService } from './tag.album.service';

@Controller('tag-album')
export class TagAlbumController {
  constructor(private readonly tagAlbumService: TagAlbumService) {}

  @Get()
  async getAlbumTags(@Query('id') album_id) {
    return await this.tagAlbumService.getAlbumTags(album_id);
  }
}
