import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { GenreController } from '../controllers/genreController';
import { GenreService } from '../services/genreService';
import { genreProviders } from '../providers/genreProviders';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [GenreService, ...genreProviders],
  exports: [GenreService, ...genreProviders],
})
export class GenreModule {}
