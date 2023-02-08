import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { UserService } from '../user/user.service';
import { TagTrack } from '../tag/tag.track/tag.track.entity';
import { EditTrackDto } from './dto/edit.track.dto';

dotenv.config();

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
    @Inject('TAG_TRACK_REPOSITORY')
    private tagTrackRepository: typeof TagTrack,
    @Inject('GENRE_TRACK_REPOSITORY')
    private genreTrackRepository: typeof GenreTrack,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly tagTrackService: TagTrackService,
    private readonly tagService: TagService,
    private readonly genreTrackService: GenreTrackService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async getTrackById(id): Promise<Track> {
    const track = await this.trackRepository.findByPk(id);
    if (!track) {
      throw new HttpException(`Cannot find track ${id}`, HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async findAll(request, response): Promise<Track[]> {
    const trackEntities = await this.trackRepository.findAll<Track>();
    const data = trackEntities.map((trackEntity) => trackEntity.dataValues);
    return response.status(HttpStatus.OK).send({ data: data });
  }

  async uploadTrack(token, files, dto) {
    const jwtPayload = await this.authService.verifyToken(token);

    if (!files.track) {
      throw new BadRequestException('No track to upload');
    }

    const user = await this.userService.getById(jwtPayload.user_id);
    if (!user) {
      throw new HttpException(
        `Cannot find user with od ${jwtPayload.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const track = await this.trackRepository.create({
      user_id: user.id,
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

    let pictureUrl = null;
    if (files.picture) {
      pictureUrl = await this.digitalOceanService.uploadFile(
        files.picture[0].buffer,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH + track.id,
      );
    }

    if (!pictureUrl) {
      track.picture_url =
        process.env.DIGITAL_OCEAN_HREF +
        '/' +
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH_DEFAULT;
    } else track.picture_url = pictureUrl;

    await this.trackTagGenreHandler(dto, track.id);

    await track.save();

    user.tracks_count++;
    await user.save();

    return {
      id: track.id,
      title: track.title,
      user_id: track.user_id,
    };
  }

  async trackTagGenreHandler(dto, trackId: string) {
    const genreIds = await this.parseComma(dto.genres);
    genreIds.map(async (genreId) => {
      await this.genreTrackService.create(genreId, trackId);
    });

    const tagTitles = await this.parseComma(dto.tags);
    tagTitles.map(async (tagTitle) => {
      const tag = await this.tagService.createTagByTitle(tagTitle);
      await this.tagTrackService.createOne(tag.id, trackId);
    });
  }

  // WIP
  async remove(track_id: string) {
    const track = await this.getTrackById(track_id);
    if (!track) {
      throw new NotFoundException();
    }

    const removeTrackFile = await this.digitalOceanService.removeFile(
      process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH,
      track.id,
    );

    if (
      !(
        process.env.DIGITAL_OCEAN_HREF +
          '/' +
          process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH_DEFAULT ===
        track.picture_url
      )
    ) {
      const removePictureFile = await this.digitalOceanService.removeFile(
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
        track.id,
      );
    }
    await track.destroy();
  }

  async clearTrackTags(id) {
    const tagsTrack = await this.tagTrackRepository.findAll({
      where: {
        track_id: id,
      },
    });
    if (!tagsTrack.length) {
      return;
    }
    await Promise.all(
      tagsTrack.map(async (tagTrack) => {
        const tag = await this.tagService.getTagById(tagTrack.tag_id);
        await tagTrack.destroy();
        tag.amount--;
        await tag.save();
      }),
    );
  }

  async clearTrackGenres(id) {
    const genresTrack = await this.genreTrackRepository.findAll({
      where: {
        track_id: id,
      },
    });
    if (!genresTrack.length) {
      return;
    }
    await Promise.all(
      genresTrack.map(async (genreTrack) => {
        await genreTrack.destroy();
      }),
    );
  }

  async edit(token: string, dto: EditTrackDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const track = await this.getTrackById(dto.id);

    if (track.user_id !== user.id) {
      throw new HttpException(
        `User ${user.id} is not owner of track ${track.id} `,
        HttpStatus.BAD_REQUEST,
      );
    }

    const genreIds = await this.parseComma(dto.genres);
    if (genreIds) {
      await this.clearTrackGenres(track.id);
      await Promise.all(
        genreIds.map(async (genreId) => {
          await this.genreTrackService.create(genreId, track.id);
        }),
      );
    }

    const tagTitles = await this.parseComma(dto.tags);
    if (tagTitles) {
      await this.clearTrackTags(track.id);
      await Promise.all(
        tagTitles.map(async (tagTitle) => {
          const tag = await this.tagService.createTagByTitle(tagTitle);
          await this.tagTrackService.createOne(tag.id, track.id);
        }),
      );
    }

    track.title = dto.title;
    track.explicit = toBoolean(dto.explicit);
    track.lyrics = dto.lyrics;

    await track.save();
    return {
      id: track.id,
      title: track.title,
      explicit: track.explicit,
      lyrics: track.lyrics,
    };
  }

  async play(track_id: string) {
    const track = await this.getTrackById(track_id);
    if (!track) {
      throw new NotFoundException();
    }
    track.plays++;
    await track.save();
    throw new HttpException('Updated', HttpStatus.OK);
  }

  async parseComma(str: string): Promise<string[]> {
    return str.split(',');
  }
}
