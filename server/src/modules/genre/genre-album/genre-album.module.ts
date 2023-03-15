import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../../shared/database/database.module';
import { GenreModule } from '../genre.module';
import { GenreAlbumController } from './genre-album.controller';
import { GenreAlbumService } from './genre-album.service';
import { genreAlbumProviders } from './genre-album.providers';
import { AlbumModule } from '../../album/album.module';

@Module({
  imports: [DatabaseModule, GenreModule],
  controllers: [GenreAlbumController],
  providers: [GenreAlbumService, ...genreAlbumProviders],
  exports: [GenreAlbumService, ...genreAlbumProviders],
})
export class GenreAlbumModule {}
