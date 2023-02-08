import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
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
import { AddTrackToPlaylistDto } from './dto/add.track.to.playlist.dto';
import { GetPlaylistDto } from './dto/get.playlist.dto';
import { RemoveTrackFromPlaylistDto } from './dto/remove.track.from.playlist.dto';
import { EditPlaylistDto } from './dto/edit.playlist.dto';
import { ChangePlaylistPictureDto } from './dto/change.playlist.picture.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

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

  @Get('/track')
  @UsePipes(new ValidationPipe())
  async getPlaylistTracks(@Query() dto: GetPlaylistDto) {
    return await this.playlistService.getPlaylistTracks(dto.id);
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
  async addTrack(@Req() request, @Body() dto: AddTrackToPlaylistDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.addTrack(token, dto);
  }

  @Delete('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeTrack(@Req() request, @Body() dto: RemoveTrackFromPlaylistDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.removeTrack(token, dto);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditPlaylistDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.editPlaylist(token, dto);
  }

  @Patch('/picture')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async changePicture(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: ChangePlaylistPictureDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.changePicture(
      token,
      files.picture[0],
      dto,
    );
  }
}
