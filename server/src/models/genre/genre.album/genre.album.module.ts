import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { GenreModule } from '../genre.module';
import { GenreAlbumController } from './genre.album.controller';
import { GenreAlbumService } from './genre.album.service';
import { genreAlbumProviders } from './genre.album.providers';
import { AlbumModule } from '../../album/album.module';

@Module({
  imports: [DatabaseModule, GenreModule, AlbumModule],
  controllers: [GenreAlbumController],
  providers: [GenreAlbumService, ...genreAlbumProviders],
})
export class GenreAlbumModule {}
