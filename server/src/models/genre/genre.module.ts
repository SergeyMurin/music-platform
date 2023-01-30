import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { genreProviders } from './genre.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [GenreService, ...genreProviders],
  exports: [GenreService, ...genreProviders],
})
export class GenreModule {}
