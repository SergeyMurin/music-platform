import { Inject, Injectable } from '@nestjs/common';

import { Album } from './album.entity';
import { isArray } from 'class-validator';
import { Track } from '../track/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: typeof Album,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
  ) {}

  async create(req, res) {
    try {
      const album = await this.albumRepository.create({
        title: req.body.title,
      });

      const track = req.body.track;
      if (isArray(track)) {
        for (const trackItem of track) {
          await this.trackRepository.create({
            title: trackItem.title,
            album_id: album.id,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
