import { Inject, Injectable } from '@nestjs/common';
import { TagAlbum } from './tag.album.entity';
import { Tag } from '../tag.entity';
import { TagService } from '../tag.service';
import { isArray } from 'class-validator';
import { AlbumGenresDto } from '../../genre/genre.album/dto/album.genres.dto';
import { TrackTagsDto } from './dto/album.tags.dto';

@Injectable()
export class TagAlbumService {
  constructor(
    @Inject('TAG_ALBUM_REPOSITORY')
    private tagAlbumRepository: typeof TagAlbum,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
    private readonly tagService: TagService,
  ) {}

  async getAlbumTags(album_id: string): Promise<Promise<TrackTagsDto>[]> {
    const albumTags = await this.tagAlbumRepository.findAll({
      where: { album_id },
    });
    return albumTags.map(async (albumTag) => {
      const responseDto = new TrackTagsDto();
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
