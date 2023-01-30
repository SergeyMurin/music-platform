import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { RepostService } from './repost.service';

@Controller('repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
