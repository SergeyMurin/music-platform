import { Controller } from '@nestjs/common';

import { AlbumTrackService } from '../services/albumTrackService';

@Controller('album-track')
export class AlbumTrackController {
  constructor(private readonly albumTrackService: AlbumTrackService) {}
}
