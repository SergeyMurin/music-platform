import { Inject, Injectable } from '@nestjs/common';
import { TagAlbum } from './tag.album.entity';
import { Tag } from '../tag.entity';
import { TagService } from '../tag.service';
import { isArray } from 'class-validator';

@Injectable()
export class TagAlbumService {
  constructor(
    @Inject('TAG_ALBUM_REPOSITORY')
    private tagAlbumRepository: typeof TagAlbum,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
    private readonly tagService: TagService,
  ) {}

  async add(query, req, res) {
    const title = req.body.title;
    const albumId = query.album_id;
    if (isArray(title)) {
      for (const titleElement of title) {
        await this.tagService.createTag(
          { title: titleElement, track_id: albumId },
          req,
          res,
        );

        const tag = await this.tagRepository.findOne({
          where: {
            title: titleElement,
          },
        });

        await this.tagAlbumRepository.create({
          id: tag.id,
          album_id: albumId,
        });
      }
    }
  }
}
