import { Controller } from '@nestjs/common';

import { AlbumTrackService } from './album-track.service';

@Controller('album-track')
export class AlbumTrackController {
  constructor(private readonly albumTrackService: AlbumTrackService) {}
}
