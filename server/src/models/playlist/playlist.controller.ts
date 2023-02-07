import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackDto } from './dto/add.track.dto';
import { GetPlaylistDto } from './dto/get.playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  //getPlaylistTracks
  //removeTrackFromPlaylist
  //removePlaylist

  @Get()
  @UsePipes(new ValidationPipe())
  async getPlaylist(@Query() dto: GetPlaylistDto) {
    return await this.playlistService.getPlaylistById(dto.id);
  }

  @Get('/user')
  @UsePipes(new ValidationPipe())
  async getUserPlaylists(@Query() dto: GetPlaylistDto) {
    return await this.playlistService.getUserPlaylists(dto.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async create(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: CreatePlaylistDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.create(token, files, dto);
  }

  @Post('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'track', maxCount: 1 }]))
  async addTrack(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: AddTrackDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.addTrack(token, files, dto);
  }
}
