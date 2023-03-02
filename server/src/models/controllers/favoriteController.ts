import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { FavoriteService } from '../services/favoriteService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RemoveFavoriteDTO } from '../DTO/favorite/removeFavoriteDTO';
import { IdDTO } from '../DTO/favorite/idDTO';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getFavorite(@Query() dto: IdDTO, @Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteService.getFavorite(token, dto.id);
  }

  @Get('/all')
  @UsePipes(new ValidationPipe())
  async getFavorites(@Query() dto: IdDTO) {
    return await this.favoriteService.getFavorites(dto.id);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request: Request, @Body() dto: RemoveFavoriteDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteService.remove(token, dto);
  }
}
