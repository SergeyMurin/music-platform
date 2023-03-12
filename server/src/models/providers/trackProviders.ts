import { Track } from '../entities/trackEntity';

export const trackProviders = [
  {
    provide: 'TRACK_REPOSITORY',
    useValue: Track,
  },
];
