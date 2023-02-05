import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTrackDto } from './dto/create.track.dto';
import { PlayTrackDto } from './dto/play.track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return this.trackService.findAll(request, response);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'track', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ]),
  )
  async upload(
    @UploadedFiles() files,
    @Req() request: Request,
    @Body() dto: CreateTrackDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.uploadTrack(token, files, dto);
  }

  @Post('/play')
  @UsePipes(new ValidationPipe())
  async play(@Body() dto: PlayTrackDto) {
    return await this.trackService.play(dto.track_id);
  }

  /* @Delete(':id')
         remove(
           @Param('id') id: string,
           @Req() request: Request,
           @Res() response: Response,
         ) {
           this.trackService.removeTrack(request, response, id);
         }*/
}
