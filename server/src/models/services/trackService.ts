import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Track } from '../entities/trackEntity';

import { DigitalOceanService } from '../../digitalOcean/digitalOceanService';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { GenreTrackService } from './genreTrackService';
import { GenreTrack } from '../entities/genreTrackEntity';
import { TagTrackService } from './tagTrackService';
import { TagService } from './tagService';
import validator from 'validator';
import toBoolean = validator.toBoolean;
import { AuthService } from './authService';
import { UserService } from './userService';
import { TagTrack } from '../entities/tagTrackEntity';
import { EditTrackDTO } from '../DTO/track/editTrackDTO';
import { AlbumTrackService } from './albumTrackService';
import { AlbumService } from './albumService';
import { AlbumTrack } from '../entities/albumTrackEntity';
import { CommentService } from './commentService';
import { FavoriteTrackService } from './favoriteTrackService';
import { RepostService } from './repostService';
import { Op } from 'sequelize';

dotenv.config();

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private readonly trackRepository: typeof Track,
    @Inject('TAG_TRACK_REPOSITORY')
    private readonly tagTrackRepository: typeof TagTrack,
    @Inject('GENRE_TRACK_REPOSITORY')
    private readonly genreTrackRepository: typeof GenreTrack,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly tagTrackService: TagTrackService,
    private readonly tagService: TagService,
    private readonly genreTrackService: GenreTrackService,
    private readonly albumTrackService: AlbumTrackService,
    private readonly authService: AuthService,
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
    @Inject('ALBUM_TRACK_REPOSITORY')
    private readonly albumTrackRepository: typeof AlbumTrack,
    private readonly commentService: CommentService,
    private readonly favoriteTrackService: FavoriteTrackService,
    private readonly repostService: RepostService,
  ) {}

  async getTrackById(id): Promise<Track> {
    const track = await this.trackRepository.findByPk(id);
    if (!track) {
      throw new HttpException(`Cannot find track ${id}`, HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async getTrackInfoById(id: string) {
    const track = await this.getTrackById(id);
    return {
      ...track.dataValues,
    };
  }

  async getUserTracks(userId: string) {
    const user = await this.userService.getById(userId);
    const tracks = await this.trackRepository.findAll({
      where: { user_id: user.id },
      order: [['createdAt', 'DESC']],
    });
    if (!tracks) {
      return [];
    }

    return await Promise.all(
      tracks.map(async (track) => {
        return {
          ...track.dataValues,
        };
      }),
    );
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

  async remove(token: string, track_id: string) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);

    const albumTrack = await this.albumTrackRepository.findOne({
      where: { track_id },
    });
    const track = await this.getTrackById(track_id);

    if (albumTrack) {
      throw new HttpException(
        `Track ${track.id} is a part of album. Use "DELETE album/track"`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.id !== track.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of track ${track.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.digitalOceanService.removeFile(
      track.id,
      process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH,
    );

    await this.clearTrackTags(track.id);
    await this.clearTrackGenres(track.id);
    await this.commentService.removeTrackComments(track.id);
    await this.favoriteTrackService.removeTrackFavorites(track.id);
    await this.repostService.removeTrackReposts(track.id);

    await track.destroy();
    user.tracks_count--;
    await user.save();

    if (
      track.picture_url.split(
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
      )[1] === 'default'
    ) {
      return;
    }

    await this.digitalOceanService.removeFile(
      track.id,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
    );
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

  async edit(token: string, dto: EditTrackDTO) {
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

  async changePicture(token, picture, track_id: string) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);

    const albumTrack = await this.albumTrackRepository.findOne({
      where: { track_id },
    });
    const track = await this.getTrackById(track_id);

    if (albumTrack) {
      throw new HttpException(
        `Track ${track.id} is a part of album. Use "PATCH album/picture"`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const previousUrl = track.picture_url;

    if (user.id !== track.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${track.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      track.picture_url.split(
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
      )[1] !== 'default'
    ) {
      await this.digitalOceanService.removeFile(
        track.id,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
      );
    }

    track.picture_url = await this.digitalOceanService.uploadFile(
      picture.buffer,
      track.id,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_TRACK_PATH,
    );

    await track.save();
    return {
      url: track.picture_url,
      previous_url: previousUrl,
    };
  }

  async searchByTerm(term: string) {
    const searchTitle = '%' + term.replace(' ', '%') + '%';
    const searchedTracks = await this.trackRepository.findAll({
      where: {
        title: {
          [Op.iLike]: searchTitle,
        },
      },
      order: [['likes', 'DESC']],
    });

    return await Promise.all(
      searchedTracks.map(async (track) => {
        return {
          ...track.dataValues,
        };
      }),
    );
  }

  async parseComma(str: string): Promise<string[]> {
    return str.split(',');
  }

  async getPopularTracks(limit: number) {
    const tracks = await this.trackRepository.findAll({
      limit,
      order: [
        ['likes', 'DESC'],
        ['createdAt', 'ASC'],
      ],
    });
    return await Promise.all(
      tracks.map(async (track) => {
        return { ...track.dataValues };
      }),
    );
  }

  async download(id: string) {
    return await this.digitalOceanService.download(id);
  }
}
