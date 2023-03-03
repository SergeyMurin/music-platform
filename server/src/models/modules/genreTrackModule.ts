import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { GenreModule } from './genreModule';
import { genreTrackProviders } from '../providers/genreTrackProviders';
import { GenreTrackService } from '../services/genreTrackService';
import { GenreTrackController } from '../controllers/genreTrackController';
import { TrackModule } from './trackModule';
import { GenreTrack } from '../entities/genreTrackEntity';

@Module({
  imports: [DatabaseModule, GenreModule, forwardRef(() => TrackModule)],
  controllers: [GenreTrackController],
  providers: [GenreTrackService, ...genreTrackProviders],
  exports: [GenreTrackService, ...genreTrackProviders],
})
export class GenreTrackModule {}
