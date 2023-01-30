import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';
import { SubscriberService } from './subscriber.service';

@Controller('subscribe')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  subscribe(@Req() request, @Res() response, @Query() query) {
    this.subscriberService.subscribe(query, request, response);
  }
}
