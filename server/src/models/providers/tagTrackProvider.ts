import { TagTrack } from '../entities/tagTrackEntity';

export const tagTrackProvider = [
  {
    provide: 'TAG_TRACK_REPOSITORY',
    useValue: TagTrack,
  },
];
