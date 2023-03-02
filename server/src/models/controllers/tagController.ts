import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { TagService } from '../services/tagService';
import { CreateTagDTO } from '../DTO/tag/createTagDTO';
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
  async createTag(@Body() dto: CreateTagDTO | CreateTagDTO[]) {
    return await this.tagService.createTag(dto);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async removeTag(@Body() dto: CreateTagDTO | CreateTagDTO[]) {
    return await this.tagService.removeTag(dto);
  }
}
