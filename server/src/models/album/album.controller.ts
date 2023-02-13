import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
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
import { AlbumService } from './album.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateAlbumDto } from './dto/create.album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackToAlbumDto } from './dto/add.track.to.album.dto';
import { EditAlbumDto } from './dto/edit.album.dto';
import { RemoveAlbumDto } from './dto/remove.album.dto';
import { RemoveTrackFromAlbumDto } from './dto/remove.track.from.album.dto';
import { GetAlbumDto } from './dto/get.album.dto';
import { GetUserAlbumsDto } from './dto/get.user.albums.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbum(@Query() dto: GetAlbumDto) {
    return await this.albumService.getAlbumById(dto.id);
  }

  @Get()
  async getUserAlbums(@Query() dto: GetUserAlbumsDto) {
    return await this.albumService.getUserAlbums(dto.id, dto.user_id);
  }

  @Get()
  async getAlbumTracks(@Query() dto: GetAlbumDto) {
    return await this.albumService.getAlbumTracks(dto.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'track' },
    ]),
  )
  async create(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: CreateAlbumDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.create(token, files, dto);
  }

  @Post('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'track' }]))
  async addTrackToAlbum(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: AddTrackToAlbumDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.addTrackToAlbum(token, files, dto);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditAlbumDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.edit(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request, @Body() dto: RemoveAlbumDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.remove(token, dto);
  }

  @Patch('/picture')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async changePicture(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: RemoveAlbumDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.changePicture(token, files.picture[0], dto);
  }

  @Delete('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeAlbumTrack(@Req() request, @Body() dto: RemoveTrackFromAlbumDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.removeAlbumTrack(token, dto);
  }
}
