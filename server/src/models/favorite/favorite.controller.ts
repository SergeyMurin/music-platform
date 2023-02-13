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

import { FavoriteService } from './favorite.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RemoveFavoriteDto } from './dto/remove.favorite.dto';
import { IdDto } from './dto/id.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getFavorite(@Query() dto: IdDto, @Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteService.getFavorite(token, dto.id);
  }

  @Get('/all')
  @UsePipes(new ValidationPipe())
  async getFavorites(@Query() dto: IdDto) {
    return await this.favoriteService.getFavorites(dto.id);
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
