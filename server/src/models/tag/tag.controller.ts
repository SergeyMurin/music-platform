import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';

import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  create(@Query() query, @Req() request, @Res() response) {
    this.tagService.create(query, request, response);
  }
}
