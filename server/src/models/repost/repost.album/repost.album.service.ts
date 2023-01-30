import { Inject, Injectable } from '@nestjs/common';

import { RepostAlbum } from './repost.album.entity';

@Injectable()
export class RepostAlbumService {
  constructor(
    @Inject('REPOST_ALBUM_REPOSITORY')
    private repostAlbumRepository: typeof RepostAlbum,
  ) {}
}
