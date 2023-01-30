import { Inject, Injectable } from '@nestjs/common';
import { RepostTrack } from './repost.track.entity';

@Injectable()
export class RepostTrackService {
  constructor(
    @Inject('REPOST_TRACK_REPOSITORY')
    private repostTrackRepository: typeof RepostTrack,
  ) {}
}
