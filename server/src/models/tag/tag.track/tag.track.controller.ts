import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';
import { TagTrackService } from './tag.track.service';

@Controller('tag-track')
export class TagTrackController {
  constructor(private readonly tagTrackService: TagTrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  add(@Query() query, @Req() request: Request, @Res() response: Response) {
    this.tagTrackService.add(query, request, response);
  }
}
