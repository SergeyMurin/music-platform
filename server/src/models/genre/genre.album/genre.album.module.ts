import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { GenreModule } from '../genre.module';
import { GenreAlbumController } from './genre.album.controller';
import { GenreAlbumService } from './genre.album.service';
import { genreAlbumProviders } from './genre.album.providers';

@Module({
  imports: [DatabaseModule, GenreModule],
  controllers: [GenreAlbumController],
  providers: [GenreAlbumService, ...genreAlbumProviders],
})
export class GenreAlbumModule {}
