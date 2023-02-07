import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create.tag.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAll() {
    return await this.tagService.getAllTags();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createTag(@Body() dto: CreateTagDto | CreateTagDto[]) {
    return await this.tagService.createTag(dto);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async removeTag(@Body() dto: CreateTagDto | CreateTagDto[]) {
    return await this.tagService.removeTag(dto);
  }
}
