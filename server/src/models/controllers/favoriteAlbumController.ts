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
import { FavoriteAlbumService } from '../services/favoriteAlbumService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteAlbumDTO } from '../DTO/favoriteAlbum/createFavoriteAlbumDTO';

@Controller('favorite-album')
export class FavoriteAlbumController {
  constructor(private readonly favoriteAlbumService: FavoriteAlbumService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Req() request: Request, @Body() dto: CreateFavoriteAlbumDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteAlbumService.create(token, dto);
  }
}
