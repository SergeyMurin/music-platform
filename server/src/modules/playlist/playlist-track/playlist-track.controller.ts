import { Controller } from '@nestjs/common';

import { PlaylistTrackService } from './playlist-track.service';

@Controller('playlist-track')
export class PlaylistTrackController {
  constructor(private readonly playlistTrackService: PlaylistTrackService) {}
}
