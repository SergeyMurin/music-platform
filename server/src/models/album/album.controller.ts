import {
  Body,
  Controller,
  Post,
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
import { CreateAlbumTrackDto } from './dto/create.album.track.dto';
import { AddTrackToAlbumDto } from './dto/add.track.to.album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  //addTrackToAlbum
  //removeTrackFromAlbum
  //editAlbum
  //removeAlbum count--

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
}
