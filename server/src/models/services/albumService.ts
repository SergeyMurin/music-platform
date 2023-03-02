import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Album } from '../entities/albumEntity';
import { Track } from '../entities/trackEntity';
import { CreateAlbumDTO } from '../DTO/album/createAlbumDTO';
import { DigitalOceanService } from '../../digitalOcean/digitalOceanService';
import { TrackService } from './trackService';
import { TagService } from './tagService';
import { GenreAlbumService } from './genreAlbumService';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { AuthService } from './authService';
import { UserService } from './userService';
import { AlbumTrackService } from './albumTrackService';
import validator from 'validator';
import toBoolean = validator.toBoolean;
import { TagAlbumService } from './tagAlbumService';
import { AddTrackToAlbumDTO } from '../DTO/album/addTrackToAlbumDTO';
import { EditAlbumDTO } from '../DTO/album/editAlbumDTO';
import { TagAlbum } from '../entities/tagAlbumEntity';
import { GenreAlbum } from '../entities/genreAlbumEntity';
import { RemoveTrackFromAlbumDTO } from '../DTO/album/removeTrackFromAlbumDTO';
import { FavoriteAlbumService } from './favoriteAlbumService';
import { FavoriteTrackService } from './favoriteTrackService';
import { RepostService } from './repostService';
import { Op } from 'sequelize';

dotenv.config();

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: typeof Album,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
    @Inject('TAG_ALBUM_REPOSITORY')
    private tagAlbumRepository: typeof TagAlbum,
    @Inject('GENRE_ALBUM_REPOSITORY')
    private genreAlbumRepository: typeof GenreAlbum,
    private readonly digitalOceanService: DigitalOceanService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    private readonly tagService: TagService,
    private readonly genreAlbumService: GenreAlbumService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly albumTrackService: AlbumTrackService,
    private readonly tagAlbumService: TagAlbumService,
    private readonly favoriteAlbumService: FavoriteAlbumService,
    private readonly favoriteTrackService: FavoriteTrackService,
    private readonly repostService: RepostService,
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

  async getAlbumById(id: string) {
    const album = await this.getById(id);
    return {
      id: album.id,
      title: album.title,
      picture_url: album.picture_url,
      likes: album.likes,
      tracks_count: album.tracks_count,
      user_id: album.user_id,
    };
  }

  async getUserAlbums(id: string, user_id: string) {
    const user = await this.userService.getById(user_id);
    const albums = await this.albumRepository.findAll({
      where: {
        user_id: user.id,
      },
    });
    if (!albums.length) {
      return [];
    }

    return await Promise.all(
      albums.map(async (album) => {
        return {
          id: album.id,
          title: album.title,
          picture_url: album.picture_url,
          likes: album.likes,
          tracks_count: album.tracks_count,
          user_id: album.user_id,
        };
      }),
    );
  }

  async getAlbumTracks(id: string) {
    const album = await this.getById(id);
    const tracks = await this.trackRepository.findAll({
      where: {
        album_id: album.id,
      },
    });
    if (!tracks.length) {
      return [];
    }

    return await Promise.all(
      tracks.map(async (track) => {
        return {
          id: track.id,
          title: track.title,
          url: track.url,
          picture_url: track.picture_url,
          likes: track.likes,
          explicit: track.explicit,
          lyrics: track.lyrics,
          plays: track.plays,
          user_id: track.user_id,
          album_id: track.album_id,
          created_at: track.createdAt,
        };
      }),
    );
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

  /**
   *
   * @param trackFile
   * @param userId
   * @param title
   * @param explicit
   * @param lyrics
   * @param genres
   * @param tags
   * @param pictureUrl
   * @param albumId
   * @returns {Promise<string>}
   */
  async uploadAlbumTrack(
    trackFile,
    userId,
    title,
    explicit,
    lyrics,
    genres,
    tags,
    pictureUrl,
    albumId,
  ) {
    const track = await this.trackRepository.create({
      user_id: userId,
      title: title,
      explicit: toBoolean(explicit),
      lyrics: lyrics,
      album_id: albumId,
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

  /**
   *
   * @param {any[]} trackFiles
   * @param dto
   * @param {string} pictureUrl
   * @param {string} userId
   * @param {string} albumId
   * @returns {Promise<string[]>}
   */
  async uploadAlbumTracks(
    trackFiles: any[],
    dto: CreateAlbumDTO | any,
    pictureUrl: string,
    userId: string,
    albumId: string,
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
              albumId,
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
              albumId,
            );
      }),
    );
  }

  /**
   *
   * @param {string} token
   * @param files
   * @param {CreateAlbumDTO} dto
   * @returns {Promise<{picture_url: string, user_id: string, id: string, tracks: string[]}>}
   */
  async create(token: string, files, dto: CreateAlbumDTO) {
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

    let albumPictureUrl =
      process.env.DIGITAL_OCEAN_HREF +
      '/' +
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH_DEFAULT;
    if (files.picture) {
      albumPictureUrl = await this.uploadAlbumPicture(
        files.picture[0],
        album.id,
      );
    }
    album.picture_url = albumPictureUrl;

    const trackIds = await this.uploadAlbumTracks(
      files.track,
      dto,
      albumPictureUrl,
      user.id,
      album.id,
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

  /**
   *
   * @param dto
   * @param {string} albumId
   * @returns {Promise<void>}
   */
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

  /**
   *
   * @param token
   * @param files
   * @param {AddTrackToAlbumDTO} dto
   * @returns {Promise<{track_id: string, id: string}>}
   */
  async addTrackToAlbum(token, files, dto: AddTrackToAlbumDTO) {
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
      album.id,
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

  /**
   *
   * @param token
   * @param {EditAlbumDTO} dto
   * @returns {Promise<void>}
   */
  async edit(token, dto: EditAlbumDTO) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.getById(dto.id);

    if (user.id !== album.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${album.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const genreIds = await this.parseComma(dto.genres);
    if (genreIds) {
      await this.clearAlbumGenres(album.id);
      await Promise.all(
        genreIds.map(async (genreId) => {
          await this.genreAlbumService.create(genreId, album.id);
        }),
      );
    }

    const tagTitles = await this.parseComma(dto.tags);
    if (tagTitles) {
      await this.clearAlbumTags(album.id);
      await Promise.all(
        tagTitles.map(async (tagTitle) => {
          const tag = await this.tagService.createTagByTitle(tagTitle);
          await this.tagAlbumService.createOne(tag.id, album.id);
        }),
      );
    }

    album.title = dto.title;
    await album.save();
    return {
      id: album.id,
      title: album.title,
    };
  }

  async remove(token, dto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.getById(dto.id);

    if (user.id !== album.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${album.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const albumTracks = await this.albumTrackService.findAllByAlbumId(album.id);

    await Promise.all(
      albumTracks.map(async (albumTrack) => {
        const track = await this.trackService.getTrackById(albumTrack.track_id);
        await this.digitalOceanService.removeFile(
          track.id,
          process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH,
        );

        await this.albumTrackService.remove(album.id, track.id);
        await this.trackService.clearTrackTags(track.id);
        await this.trackService.clearTrackGenres(track.id);
        await this.favoriteTrackService.removeTrackFavorites(track.id);
        await this.repostService.removeTrackReposts(track.id);

        await track.destroy();

        user.tracks_count--;

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
      }),
    );

    await this.digitalOceanService.removeFile(
      album.id,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH,
    );

    await this.clearAlbumTags(album.id);
    await this.clearAlbumGenres(album.id);
    await this.favoriteAlbumService.removeAlbumFavorites(album.id);
    await this.repostService.removeAlbumReposts(album.id);

    await album.destroy();
    user.albums_count--;
    await user.save();

    throw new HttpException('Successfully deleted', HttpStatus.NO_CONTENT);
  }

  async clearAlbumTags(id) {
    const tagsAlbum = await this.tagAlbumRepository.findAll({
      where: {
        album_id: id,
      },
    });
    if (!tagsAlbum.length) {
      return;
    }
    await Promise.all(
      tagsAlbum.map(async (tagAlbum) => {
        const tag = await this.tagService.getTagById(tagAlbum.tag_id);
        await tagAlbum.destroy();
        tag.amount--;
        await tag.save();
      }),
    );
  }

  async clearAlbumGenres(id) {
    const genresAlbum = await this.genreAlbumRepository.findAll({
      where: {
        album_id: id,
      },
    });
    if (!genresAlbum.length) {
      return;
    }
    await Promise.all(
      genresAlbum.map(async (genreAlbum) => {
        await genreAlbum.destroy();
      }),
    );
  }

  async changePicture(token, picture, dto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const album = await this.getById(dto.id);
    const previousUrl = album.picture_url;

    if (user.id !== album.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${album.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      album.picture_url.split(
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH,
      )[1] !== 'default'
    ) {
      await this.digitalOceanService.removeFile(
        album.id,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH,
      );
    }

    album.picture_url = await this.digitalOceanService.uploadFile(
      picture.buffer,
      album.id,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_ALBUM_PATH,
    );

    const albumTracks = await this.trackRepository.findAll({
      where: { album_id: album.id },
    });
    if (albumTracks.length) {
      await Promise.all(
        albumTracks.map(async (albumTrack) => {
          albumTrack.picture_url = album.picture_url;
        }),
      );
    }

    await album.save();
    return {
      url: album.picture_url,
      previous_url: previousUrl,
    };
  }

  async removeAlbumTrack(token: string, dto: RemoveTrackFromAlbumDTO) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.userService.getById(jwtPayload.user_id);
    const albumTrack = await this.albumTrackService.findByTrackId(dto.id);
    const album = await this.getById(albumTrack.album_id);

    if (user.id !== album.user_id) {
      throw new HttpException(
        `User ${user.id} is not owner of album ${album.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const track = await this.trackService.getTrackById(albumTrack.track_id);
    await this.digitalOceanService.removeFile(
      track.id,
      process.env.DIGITAL_OCEAN_BUCKET_TRACK_PATH,
    );

    await this.clearAlbumTags(album.id);
    await this.clearAlbumGenres(album.id);

    await this.albumTrackService.remove(album.id, track.id);
    await this.trackService.clearTrackTags(track.id);
    await this.trackService.clearTrackGenres(track.id);

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

  async searchByTerm(term: string) {
    const searchTitle = '%' + term.replace(' ', '%') + '%';
    const searchedAlbums = await this.albumRepository.findAll({
      where: {
        title: {
          [Op.iLike]: searchTitle,
        },
      },
      order: [['likes', 'DESC']],
    });

    return await Promise.all(
      searchedAlbums.map(async (album) => {
        return {
          id: album.id,
          title: album.title,
          picture_url: album.picture_url,
          likes: album.likes,
          tracks_count: album.tracks_count,
          user_id: album.user_id,
        };
      }),
    );
  }

  /**
   *
   * @param {string} str
   * @returns {Promise<string[]>}
   */
  async parseComma(str: string): Promise<string[]> {
    return str.split(',');
  }
}
