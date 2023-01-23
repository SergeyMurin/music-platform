import { Inject, Injectable } from '@nestjs/common';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
  ) {}

  async findAll(): Promise<Track[]> {
    const a = await this.trackRepository.findAll<Track>();
    return null;
  }

  async uploadTrack(): Promise<any> {
    const track = await Track.create({
      title: 'aa',
      author: 'b',
      duration: 123,
      explicit: true,
    });
    const a = track instanceof Track;
    return null;
  }
}
