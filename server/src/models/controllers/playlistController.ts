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
import { PlaylistService } from '../services/playlistService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistDTO } from '../DTO/playlist/createPlaylistDTO';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackToPlaylistDTO } from '../DTO/playlist/addTrackToPlaylistDTO';
import { GetPlaylistDTO } from '../DTO/playlist/getPlaylistDTO';
import { RemoveTrackFromPlaylistDTO } from '../DTO/playlist/removeTrackFromPlaylistDTO';
import { EditPlaylistDTO } from '../DTO/playlist/editPlaylistDTO';
import { ChangePlaylistPictureDTO } from '../DTO/playlist/changePlaylistPictureDTO';
import { RemovePlaylistDTO } from '../DTO/playlist/removePlaylistDTO';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getPlaylist(@Query() dto: GetPlaylistDTO) {
    return await this.playlistService.getPlaylistById(dto.id);
  }

  @Get('/user')
  @UsePipes(new ValidationPipe())
  async getUserPlaylists(@Query() dto: GetPlaylistDTO) {
    return await this.playlistService.getUserPlaylists(dto.id);
  }

  @Get('/track')
  @UsePipes(new ValidationPipe())
  async getPlaylistTracks(@Query() dto: GetPlaylistDTO) {
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
    @Body() dto: CreatePlaylistDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.create(token, files, dto);
  }

  @Post('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async addTrack(@Req() request, @Body() dto: AddTrackToPlaylistDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.addTrack(token, dto);
  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removePlaylist(@Req() request, @Body() dto: RemovePlaylistDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.removePlaylist(token, dto.id);
  }

  @Delete('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeTrack(@Req() request, @Body() dto: RemoveTrackFromPlaylistDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.removeTrack(token, dto);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditPlaylistDTO) {
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
    @Body() dto: ChangePlaylistPictureDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.playlistService.changePicture(
      token,
      files.picture[0],
      dto,
    );
  }
}
