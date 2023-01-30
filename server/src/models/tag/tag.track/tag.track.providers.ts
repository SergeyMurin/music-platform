import { TagTrack } from './tag.track.entity';

export const tagTrackProviders = [
  {
    provide: 'TAG_TRACK_REPOSITORY',
    useValue: TagTrack,
  },
];
