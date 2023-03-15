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

import { RepostService } from './repost.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTrackRepostDto } from '../../common/dto/repost/create-track-repost.dto';
import { CreateAlbumRepostDto } from '../../common/dto/repost/create-album-repost.dto';
import { RemoveRepostDto } from '../../common/dto/repost/remove-repost.dto';
import { GetUserRepostsDto } from '../../common/dto/repost/get-user-reposts.dto';

@Controller('repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  @Get('/all')
  @UsePipes(new ValidationPipe())
  async getUserReposts(@Query() dto: GetUserRepostsDto) {
    return await this.repostService.getUserReposts(dto.id);
  }

  @Post('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createTrackRepost(@Req() request, @Body() dto: CreateTrackRepostDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.createTrackRepost(token, dto);
  }

  @Post('/album')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createAlbumRepost(@Req() request, @Body() dto: CreateAlbumRepostDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.createAlbumRepost(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeRepost(@Req() request, @Body() dto: RemoveRepostDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.repostService.remove(token, dto);
  }
}
