import { Inject, Injectable } from '@nestjs/common';
import { TagTrack } from '../entities/tagTrackEntity';
import { Tag } from '../entities/tagEntity';
import { TagService } from './tagService';
import { isArray } from 'class-validator';
import { TrackTagsDTO } from '../DTO/tagTrack/trackTagsDTO';

@Injectable()
export class TagTrackService {
  constructor(
    @Inject('TAG_TRACK_REPOSITORY')
    private tagTrackRepository: typeof TagTrack,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
    private readonly tagService: TagService,
  ) {}

  async createOne(tag_id, track_id): Promise<TagTrack> {
    return await this.tagTrackRepository.create({
      tag_id,
      track_id,
    });
  }

  async getTrackTags(track_id: string): Promise<Awaited<TrackTagsDTO>[]> {
    const trackTags = await this.tagTrackRepository.findAll({
      where: { track_id },
    });
    return await Promise.all(
      trackTags.map(async (trackTag) => {
        const responseDto = new TrackTagsDTO();
        responseDto.id = trackTag.tag_id;
        const tag = await this.tagRepository.findOne({
          where: {
            id: trackTag.tag_id,
          },
        });
        responseDto.title = tag.title;
        responseDto.amount = tag.amount;
        return responseDto;
      }),
    );
  }
}
