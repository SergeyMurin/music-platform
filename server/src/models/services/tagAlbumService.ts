import { Inject, Injectable } from '@nestjs/common';
import { TagAlbum } from '../entities/tagAlbumEntity';
import { Tag } from '../entities/tagEntity';
import { TagService } from './tagService';
import { isArray } from 'class-validator';
import { AlbumGenresDTO } from '../DTO/genreAlbum/albumGenresDTO';
import { AlbumTagsDTO } from '../DTO/tagAlbum/albumTagsDTO';
import { TagTrack } from '../entities/tagTrackEntity';

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

  async getAlbumTags(album_id: string): Promise<Promise<AlbumTagsDTO>[]> {
    const albumTags = await this.tagAlbumRepository.findAll({
      where: { album_id },
    });
    return albumTags.map(async (albumTag) => {
      const responseDto = new AlbumTagsDTO();
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
