import { Inject, Injectable } from '@nestjs/common';
import { TagAlbum } from './tag.album.entity';
import { Tag } from '../tag.entity';
import { TagService } from '../tag.service';
import { isArray } from 'class-validator';
import { AlbumGenresDto } from '../../genre/genre.album/dto/album.genres.dto';
import { AlbumTagsDto } from './dto/album.tags.dto';
import { TagTrack } from '../tag.track/tag.track.entity';

@Injectable()
export class TagAlbumService {
  constructor(
    @Inject('TAG_ALBUM_REPOSITORY')
    private tagAlbumRepository: typeof TagAlbum,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
    private readonly tagService: TagService,
  ) {}

  async createOne(tag_id, album_id): Promise<TagAlbum> {
    return await this.tagAlbumRepository.create({
      tag_id,
      album_id,
    });
  }

  async getAlbumTags(album_id: string): Promise<Promise<AlbumTagsDto>[]> {
    const albumTags = await this.tagAlbumRepository.findAll({
      where: { album_id },
    });
    return albumTags.map(async (albumTag) => {
      const responseDto = new AlbumTagsDto();
      responseDto.id = albumTag.tag_id;
      const tag = await this.tagRepository.findOne({
        where: {
          id: albumTag.tag_id,
        },
      });
      responseDto.title = tag.title;
      responseDto.amount = tag.amount;
      return responseDto;
    });
  }
}
