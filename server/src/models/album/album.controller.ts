import { Controller, Post, Req, Res } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Req() request, @Res() response) {
    this.albumService.create(request, response);
  }
}
