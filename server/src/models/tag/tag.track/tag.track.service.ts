import { Inject, Injectable } from '@nestjs/common';
import { TagTrack } from './tag.track.entity';
import { Tag } from '../tag.entity';
import { TagService } from '../tag.service';
import { isArray } from 'class-validator';

@Injectable()
export class TagTrackService {
  constructor(
    @Inject('TAG_TRACK_REPOSITORY')
    private tagTrackRepository: typeof TagTrack,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
    private readonly tagService: TagService,
  ) {}

  async add(query, req, res) {
    const title = req.body.title;
    const trackId = query.track_id;
    if (isArray(title)) {
      for (const titleElement of title) {
        await this.tagService.createTag(
          { title: titleElement, track_id: trackId },
          req,
          res,
        );

        const tag = await this.tagRepository.findOne({
          where: {
            title: titleElement,
          },
        });

        await this.tagTrackRepository.create({
          id: tag.id,
          track_id: trackId,
        });
      }
    }
  }
}
