import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { GenreModule } from '../genre.module';
import { genreTrackProviders } from './genre.track.providers';
import { GenreTrackService } from './genre.track.service';
import { GenreTrackController } from './genre.track.controller';

@Module({
  imports: [DatabaseModule, GenreModule],
  controllers: [GenreTrackController],
  providers: [GenreTrackService, ...genreTrackProviders],
})
export class GenreTrackModule {}
