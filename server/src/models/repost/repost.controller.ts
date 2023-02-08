import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { RepostService } from './repost.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddTrackToPlaylistDto } from '../playlist/dto/add.track.to.playlist.dto';
import { CreateTrackRepostDto } from './dto/create.track.repost.dto';
import { CreateAlbumRepostDto } from './dto/create.album.repost.dto';

@Controller('repost')
export class RepostController {
  constructor(private readonly repostService: RepostService) {}

  //getRepost
  //getReposts
  //create count++
  //remove count--
  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
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
}
