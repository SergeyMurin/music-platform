import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AlbumTrack } from './album.track.entity';
import { AlbumService } from '../album.service';
import { Album } from '../album.entity';

@Injectable()
export class AlbumTrackService {
  constructor(
    @Inject('ALBUM_TRACK_REPOSITORY')
    private albumTrackRepository: typeof AlbumTrack,
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: typeof Album,
  ) {}

  async findAllByAlbumId(album_id): Promise<AlbumTrack[] | null> {
    const album = await this.albumRepository.findByPk(album_id);
    if (!album) {
      throw new HttpException(
        `Cannot find album ${album_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.albumTrackRepository.findAll({ where: { album_id } });
  }

  async findByAlbumId(album_id) {
    const album = await this.albumRepository.findByPk(album_id);
    if (!album) {
      throw new HttpException(
        `Cannot find album ${album_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.albumTrackRepository.findOne({ where: { album_id } });
  }

  async findByTrackId(track_id): Promise<AlbumTrack> {
    const albumTrack = await this.albumTrackRepository.findOne({
      where: { track_id: track_id },
    });

    if (!albumTrack) {
      throw new HttpException(
        `Cannot find album track ${track_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return albumTrack;
  }

  async create(album_id, track_id) {
    try {
      await AlbumTrack.create({
        album_id,
        track_id,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create PlaylistTrack');
    }
  }

  async remove(album_id, track_id) {
    const album = await this.albumRepository.findByPk(album_id);

    if (!album) {
      throw new HttpException(
        `Cannot find album ${album_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const albumTrack = await this.albumTrackRepository.findOne({
      where: {
        album_id,
        track_id,
      },
    });

    await albumTrack.destroy();

    album.tracks_count--;
    await album.save();
  }
}
