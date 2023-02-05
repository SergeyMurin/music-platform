import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Track } from './track.entity';

import { DigitalOceanService } from '../../digtal.ocean/digital.ocean.service';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { GenreTrackService } from '../genre/genre.track/genre.track.service';
import { GenreTrack } from '../genre/genre.track/genre.track.entity';
import { TagTrackService } from '../tag/tag.track/tag.track.service';
import { TagService } from '../tag/tag.service';
import validator from 'validator';
import toBoolean = validator.toBoolean;
import { AuthService } from '../user/auth/auth.service';

dotenv.config();

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly tagTrackService: TagTrackService,
    private readonly tagService: TagService,
    private readonly genreTrackService: GenreTrackService,
    private readonly authService: AuthService,
  ) {}

  async getTrackById(id) {
    return await this.trackRepository.findByPk(id);
  }

  async findAll(request, response): Promise<Track[]> {
    const trackEntities = await this.trackRepository.findAll<Track>();
    const data = trackEntities.map((trackEntity) => trackEntity.dataValues);
    return response.status(HttpStatus.OK).send({ data: data });
  }

  async uploadTrack(token, files, dto) {
    const jwtPayload = await this.authService.verifyToken(token);

    if (!files.track && !files.picture) {
      throw new BadRequestException('No files to upload');
    }

    const track = await this.trackRepository.create({
      user_id: jwtPayload.user_id,
      title: dto.title,
      explicit: toBoolean(dto.explicit),
      lyrics: dto.lyrics,
    });

    const trackUrl = await this.digitalOceanService.uploadFile(
      files.track[0].buffer,
      process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH + track.id,
    );
    if (!trackUrl) {
      await track.destroy();
      throw new InternalServerErrorException('Upload failed');
    } else track.url = trackUrl;

    const pictureUrl = await this.digitalOceanService.uploadFile(
      files.picture[0].buffer,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH + track.id,
    );
    if (!pictureUrl) {
      track.picture_url =
        process.env.DIGITAL_OCEAN_HREF +
        '/' +
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH_DEFAULT;
    } else track.picture_url = pictureUrl;

    const genreIds = await this.parseComma(dto.genres);
    genreIds.map(async (genreId) => {
      await this.genreTrackService.create(genreId, track.id);
    });

    const tagTitles = await this.parseComma(dto.tags);
    tagTitles.map(async (tagTitle) => {
      const tag = await this.tagService.createTagByTitle(tagTitle);
      await this.tagTrackService.createOne(tag.id, track.id);
    });

    await track.save();

    throw new HttpException('Created', HttpStatus.CREATED);
  }

  async play(track_id) {
    const track = await this.getTrackById(track_id);
    if (!track) {
      throw new BadRequestException();
    }
    track.plays++;
    await track.save();
    throw new HttpException('Updated', HttpStatus.OK);
  }

  async parseComma(str: string): Promise<string[]> {
    return str.split(',');
  }
}
