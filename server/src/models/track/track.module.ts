import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackService } from './track.service';
import { trackProviders } from './track.providers';
import { TrackController } from './track.controller';
import { AuthModule } from '../user/auth/auth.module';
import { TagTrackModule } from '../tag/tag.track/tag.track.module';
import { GenreTrackModule } from '../genre/genre.track/genre.track.module';
import { DigitalOceanModule } from '../../digtal.ocean/digita.ocean.module';
import { TagModule } from '../tag/tag.module';
import { GenreTrack } from '../genre/genre.track/genre.track.entity';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TagTrackModule,
    DigitalOceanModule,
    TagModule,
    forwardRef(() => GenreTrackModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, ...trackProviders],
  exports: [TrackService, ...trackProviders],
})
export class TrackModule {}
