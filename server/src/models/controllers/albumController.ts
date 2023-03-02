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
import { AlbumService } from '../services/albumService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateAlbumDTO } from '../DTO/album/createAlbumDTO';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AddTrackToAlbumDTO } from '../DTO/album/addTrackToAlbumDTO';
import { EditAlbumDTO } from '../DTO/album/editAlbumDTO';
import { RemoveALbumDTO } from '../DTO/album/removeALbumDTO';
import { RemoveTrackFromAlbumDTO } from '../DTO/album/removeTrackFromAlbumDTO';
import { GetAlbumDTO } from '../DTO/album/getAlbumDTO';
import { GetUserAlbumsDTO } from '../DTO/album/getUserAlbumsDTO';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbum(@Query() dto: GetAlbumDTO) {
    return await this.albumService.getAlbumById(dto.id);
  }

  @Get()
  async getUserAlbums(@Query() dto: GetUserAlbumsDTO) {
    return await this.albumService.getUserAlbums(dto.id, dto.user_id);
  }

  @Get()
  async getAlbumTracks(@Query() dto: GetAlbumDTO) {
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
    @Body() dto: CreateAlbumDTO,
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
    @Body() dto: AddTrackToAlbumDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.addTrackToAlbum(token, files, dto);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditAlbumDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.edit(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request, @Body() dto: RemoveALbumDTO) {
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
    @Body() dto: RemoveALbumDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.changePicture(token, files.picture[0], dto);
  }

  @Delete('/track')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async removeAlbumTrack(@Req() request, @Body() dto: RemoveTrackFromAlbumDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.albumService.removeAlbumTrack(token, dto);
  }
}
