import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { GenreModule } from '../genre.module';
import { genreTrackProviders } from './genre.track.providers';
import { GenreTrackService } from './genre.track.service';
import { GenreTrackController } from './genre.track.controller';
import { TrackModule } from '../../track/track.module';

@Module({
  imports: [DatabaseModule, GenreModule, TrackModule],
  controllers: [GenreTrackController],
  providers: [GenreTrackService, ...genreTrackProviders],
})
export class GenreTrackModule {}
