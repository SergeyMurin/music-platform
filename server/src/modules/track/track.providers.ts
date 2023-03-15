import { Track } from './track.entity';

export const trackProviders = [
  {
    provide: 'TRACK_REPOSITORY',
    useValue: Track,
  },
];
