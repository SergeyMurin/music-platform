import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  RawBodyRequest,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Req() request, @Res() response) {
    this.playlistService.create(request, response);
  }

  @Put()
  add(@Req() request, @Res() response) {
    this.playlistService.add(request, response);
  }
}
