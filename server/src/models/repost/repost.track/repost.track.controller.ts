import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { RepostTrackService } from './repost.track.service';

@Controller('repost-track')
export class RepostTrackController {
  constructor(private readonly repostTrackService: RepostTrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
