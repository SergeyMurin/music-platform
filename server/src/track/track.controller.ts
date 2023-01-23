import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { TrackService } from './track.service';
import { Request, Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return this.trackService.findAll(request, response);
  }

  @Post()
  upload(@Req() request: Request, @Res() response: Response) {
    this.trackService.uploadTrack(request, response);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    this.trackService.removeTrack(request, response, id);
  }
}
