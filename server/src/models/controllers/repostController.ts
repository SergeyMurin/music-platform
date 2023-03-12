import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RepostService } from '../services/repostService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTrackRepostDTO } from '../DTO/repost/createTrackRepostDTO';
import { CreateAlbumRepostDTO } from '../DTO/repost/createAlbumRepostDTO';
import { RemoveRepostDTO } from '../DTO/repost/removeRepostDTO';
import { GetUserRepostsDTO } from '../DTO/repost/getUserRepostsDTO';

@Controller('repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  @Get('/all')
  @UsePipes(new ValidationPipe())
  async getUserReposts(@Query() dto: GetUserRepostsDTO) {
    return await this.repostService.getUserReposts(dto.id);
  }

  @Post('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createTrackRepost(@Req() request, @Body() dto: CreateTrackRepostDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.createTrackRepost(token, dto);
  }

  @Post('/album')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createAlbumRepost(@Req() request, @Body() dto: CreateAlbumRepostDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.createAlbumRepost(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeRepost(@Req() request, @Body() dto: RemoveRepostDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.remove(token, dto);
  }
}
