import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from '../services/trackService';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CrateTrackDTO } from '../DTO/track/crateTrackDTO';
import { PlayTrackDTO } from '../DTO/track/playTrackDTO';
import { EditTrackDTO } from '../DTO/track/editTrackDTO';
import { GetTrackDTO } from '../DTO/track/getTrackDTO';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getTrackById(@Query() dto: GetTrackDTO) {
    return await this.trackService.getTrackInfoById(dto.id);
  }

  @Get('/all/popular')
  async getPopularTracks() {
    const limit = 30;
    return await this.trackService.getPopularTracks(limit);
  }

  @Get('/all')
  @UsePipes(new ValidationPipe())
  async getUserTracks(@Query() dto: GetTrackDTO) {
    return await this.trackService.getUserTracks(dto.id);
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
    @Body() dto: CrateTrackDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.uploadTrack(token, files, dto);
  }

  @Patch('/play')
  @UsePipes(new ValidationPipe())
  async play(@Body() dto: PlayTrackDTO) {
    return await this.trackService.play(dto.track_id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditTrackDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.edit(token, dto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request, @Body() dto: GetTrackDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.remove(token, dto.id);
  }

  @Patch('/picture')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async changePicture(
    @UploadedFiles() files,
    @Req() request,
    @Body() dto: GetTrackDTO,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.changePicture(
      token,
      files.picture[0],
      dto.id,
    );
  }

  @Get('/download')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async downloadTrack(@Query() dto: GetTrackDTO) {
    return await this.trackService.download(dto.id);
  }
}
