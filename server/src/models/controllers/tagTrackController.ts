import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';
import { TagTrackService } from '../services/tagTrackService';

@Controller('tag-track')
export class TagTrackController {
  constructor(private readonly tagTrackService: TagTrackService) {}

  @Get()
  async getAlbumTags(@Query('id') track_id) {
    return await this.tagTrackService.getTrackTags(track_id);
  }
}
