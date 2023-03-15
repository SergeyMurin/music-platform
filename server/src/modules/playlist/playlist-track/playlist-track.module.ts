import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../shared/database/database.module';
import { PlaylistTrackController } from './playlist-track.controller';
import { PlaylistTrackService } from './playlist-track.service';
import { playlistTrackProviders } from './playlist-track.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistTrackController],
  providers: [PlaylistTrackService, ...playlistTrackProviders],
  exports: [PlaylistTrackService],
})
export class PlaylistTrackModule {}
