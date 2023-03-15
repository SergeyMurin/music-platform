import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { FavoriteAlbumService } from './favorite-album.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteAlbumDto } from '../../../common/dto/favorite-album/create-favorite-album.dto';

@Controller('favorite-album')
export class FavoriteAlbumController {
  constructor(private readonly favoriteAlbumService: FavoriteAlbumService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Req() request: Request, @Body() dto: CreateFavoriteAlbumDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteAlbumService.create(token, dto);
  }
}
