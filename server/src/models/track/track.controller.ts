import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return this.trackService.findAll(request, response);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'soundtrack', maxCount: 1 }]))
  upload(
    @UploadedFiles() files,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    console.log('a');
    //this.trackService.uploadTrack(request, response);
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
