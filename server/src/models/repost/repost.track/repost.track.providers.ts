import { RepostTrack } from './repost.track.entity';

export const repostTrackProviders = [
  {
    provide: 'REPOST_TRACK_REPOSITORY',
    useValue: RepostTrack,
  },
];
