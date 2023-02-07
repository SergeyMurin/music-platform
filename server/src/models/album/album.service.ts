import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Album } from './album.entity';
import { isArray } from 'class-validator';
import { Track } from '../track/track.entity';
import { CreateAlbumDto } from './dto/create.album.dto';
import { DigitalOceanService } from '../../digtal.ocean/digital.ocean.service';
import { TrackService } from '../track/track.service';
import { TagService } from '../tag/tag.service';
import { GenreAlbumService } from '../genre/genre.album/genre.album.service';

import * as dotenv from 'dotenv';
import * as process from 'process';
import { AuthService } from '../user/auth/auth.service';
import { UserService } from '../user/user.service';
import { CreateAlbumTrackDto } from './dto/create.album.track.dto';
import { GenreTrackService } from '../genre/genre.track/genre.track.service';
import { TagTrackService } from '../tag/tag.track/tag.track.service';
import { AlbumTrackService } from './album.track.entity/album.track.service';
import validator from 'validator';
import toBoolean = validator.toBoolean;
import { TagAlbumService } from '../tag/tag.album/tag.album.service';
import { AddTrackToAlbumDto } from './dto/add.track.to.album.dto';

dotenv.config();

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: typeof Album,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
    private readonly digitalOceanService: DigitalOceanService,
    private readonly trackService: TrackService,
    private readonly tagService: TagService,
    private readonly genreAlbumService: GenreAlbumService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly albumTrackService: AlbumTrackService,
    private readonly tagAlbumService: TagAlbumService,
  ) {}

  async getById(id: string) {
    const album = await this.albumRepository.findByPk(id);
    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else return album;
  }

  async uploadAlbumPicture(pictureFile: any, albumId: string): Promise<string> {
    let pictureUrl = null;
    if (pictureFile) {
      pictureUrl = await this.digitalOceanService.uploadFile(
        pictureFile.buffer,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH + albumId,
      );
    }

    if (!pictureUrl) {
      return (
        process.env.DIGITAL_OCEAN_HREF +
        '/' +
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH_DEFAULT
      );
    } else return pictureUrl;
  }

  async uploadAlbumTrack(
    trackFile,
    userId,
    title,
    explicit,
    lyrics,
    genres,
    tags,
    pictureUrl,
  ) {
    const track = await this.trackRepository.create({
      user_id: userId,
      title: title,
      explicit: toBoolean(explicit),
      lyrics: lyrics,
    });

    const trackUrl = await this.digitalOceanService.uploadFile(
      trackFile.buffer,
      process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH + track.id,
    );
    if (!trackUrl) {
      await track.destroy();
      throw new InternalServerErrorException('Upload failed');
    } else track.url = trackUrl;
    track.picture_url = pictureUrl;

    await this.trackService.trackTagGenreHandler({ genres, tags }, track.id);
    await track.save();

    return track.id;
  }

  async uploadAlbumTracks(
    trackFiles: any[],
    dto: CreateAlbumDto | any,
    pictureUrl: string,
    userId: string,
  ): Promise<string[]> {
    return await Promise.all(
      trackFiles.map(async (trackFile, index) => {
        return dto.tracks
          ? await this.uploadAlbumTrack(
              trackFile,
              userId,
              dto.tracks[index].title,
              dto.tracks[index].explicit,
              dto.tracks[index].lyrics,
              dto.tracks[index].genres,
              dto.tracks[index].tags,
              pictureUrl,
            )
          : await this.uploadAlbumTrack(
              trackFile,
              userId,
              dto.title,
              dto.explicit,
              dto.lyrics,
              dto.genres,
              dto.tags,
              pictureUrl,
            );
      }),
    );
  }

  async create(token: string, files, dto: CreateAlbumDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    if (typeof dto.tracks === 'string') {
      dto.tracks = JSON.parse(dto.tracks);
    }

    if (!files.track) {
      throw new HttpException(
        'Cannot create album without tracks',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getById(jwtPayload.user_id);
    if (!user) {
      throw new HttpException(
        `Cannot find user ${jwtPayload.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const album = await this.albumRepository.create({
      title: dto.title,
      user_id: jwtPayload.user_id,
    });

    const albumPictureUrl = await this.uploadAlbumPicture(
      files.picture[0],
      album.id,
    );

    album.picture_url = albumPictureUrl;

    const trackIds = await this.uploadAlbumTracks(
      files.track,
      dto,
      albumPictureUrl,
      user.id,
    );

    await Promise.all(
      trackIds.map(async (trackId) => {
        await this.albumTrackService.create(album.id, trackId);
        user.tracks_count++;
        album.tracks_count++;
      }),
    );

    await this.albumTagGenreHandler(dto, album.id);
    user.albums_count++;
    await user.save();
    await album.save();

    return {
      id: album.id,
      picture_url: albumPictureUrl,
      user_id: user.id,
      tracks: trackIds,
    };
  }

  async albumTagGenreHandler(dto, albumId: string) {
    const genreIds = await this.parseComma(dto.genres);
    genreIds.map(async (genreId) => {
      await this.genreAlbumService.create(genreId, albumId);
    });

    const tagTitles = await this.parseComma(dto.tags);
    tagTitles.map(async (tagTitle) => {
      const tag = await this.tagService.createTagByTitle(tagTitle);
      await this.tagAlbumService.createOne(tag.id, albumId);
    });
  }

  async addTrackToAlbum(token, files, dto: AddTrackToAlbumDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.getById(dto.id);

    if (user.id !== album.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${album.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const trackId = await this.uploadAlbumTracks(
      files.track,
      dto,
      album.picture_url,
      user.id,
    );
    await this.albumTrackService.create(album.id, trackId[0]);
    await this.albumTagGenreHandler(dto, album.id);
    album.tracks_count++;
    await album.save();

    return {
      id: album.id,
      track_id: trackId[0],
    };
  }

  async parseComma(str: string): Promise<string[]> {
    return str.split(',');
  }
}
