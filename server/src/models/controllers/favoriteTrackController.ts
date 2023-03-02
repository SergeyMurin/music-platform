import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { FavoriteTrackService } from '../services/favoriteTrackService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteTrackDTO } from '../DTO/favoriteTrack/createFavoriteTrackDTO';

@Controller('favorite-track')
export class FavoriteTrackController {
  constructor(private readonly favoriteTrackService: FavoriteTrackService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Req() request: Request, @Body() dto: CreateFavoriteTrackDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.favoriteTrackService.create(token, dto);
  }
}
