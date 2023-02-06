import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { FavoriteService } from './favorite.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RemoveFavoriteDto } from './dto/remove.favorite.dto';
import { GetFavoritesDto } from './dto/get.favorites.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getFavorite(@Req() request: Request, @Body() dto: RemoveFavoriteDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteService.getFavorite(token, dto);
  }

  @Get('/all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getFavorites(@Body() dto: GetFavoritesDto) {
    return await this.favoriteService.getFavorites(dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request: Request, @Body() dto: RemoveFavoriteDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteService.remove(token, dto);
  }
}
