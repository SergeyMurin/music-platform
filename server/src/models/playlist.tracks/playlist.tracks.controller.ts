import { Controller, Post, Req, Res } from '@nestjs/common';

import { PlaylistTracksService } from './playlist.tracks.service';

@Controller('user')
export class PlaylistTracksController {
  constructor(private readonly playlistTracksService: PlaylistTracksService) {}
}
