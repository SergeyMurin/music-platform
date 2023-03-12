import { Controller } from '@nestjs/common';

import { PlaylistTrackService } from '../services/playlistTrackService';

@Controller('playlist-track')
export class PlaylistTrackController {
  constructor(private readonly playlistTrackService: PlaylistTrackService) {}
}
