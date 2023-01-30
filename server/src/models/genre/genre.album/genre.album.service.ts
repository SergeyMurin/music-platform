import { Inject, Injectable } from '@nestjs/common';
import { GenreAlbum } from './genre.album.entity';

@Injectable()
export class GenreAlbumService {
  constructor(
    @Inject('GENRE_ALBUM_REPOSITORY')
    private genreAlbumRepository: typeof GenreAlbum,
  ) {}
}
