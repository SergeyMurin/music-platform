import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TrackService } from './track.service';
import { trackProviders } from './track.providers';
import { TrackController } from './track.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [TrackService, ...trackProviders],
})
export class TrackModule {}
