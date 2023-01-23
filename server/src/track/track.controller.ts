import { Controller, Get, Post, Req } from '@nestjs/common';
import { TrackService } from './track.service';
import { Request } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(@Req() request: Request) {
    return this.trackService.findAll();
  }
  @Post()
  upload(@Req() request: Request) {
    return this.trackService.uploadTrack();
  }
}
