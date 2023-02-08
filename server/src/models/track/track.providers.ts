import { Track } from './track.entity';
import { TrackService } from './track.service';

export const trackProviders = [
  {
    provide: 'TRACK_REPOSITORY',
    useValue: Track,
  },
  {
    provide: 'TRACK_SERVICE',
    useValue: TrackService,
  },
];
