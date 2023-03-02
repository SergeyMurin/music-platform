import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/databaseModule';
import { GenreModule } from './genreModule';
import { GenreAlbumController } from '../controllers/genreAlbumController';
import { GenreAlbumService } from '../services/genreAlbumService';
import { genreAlbumProviders } from '../providers/genreAlbumProviders';
import { AlbumModule } from './albumModule';

@Module({
  imports: [DatabaseModule, GenreModule],
  controllers: [GenreAlbumController],
  providers: [GenreAlbumService, ...genreAlbumProviders],
  exports: [GenreAlbumService, ...genreAlbumProviders],
})
export class GenreAlbumModule {}
