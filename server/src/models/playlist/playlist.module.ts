import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { playlistProviders } from './playlist.providers';
import { PlaylistTrackService } from './playlist.track/playlist.track.service';
import { PlaylistTrackModule } from './playlist.track/playlist.track.module';
import { playlistTrackProviders } from './playlist.track/playlist.track.providers';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [DatabaseModule, PlaylistTrackModule, TrackModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, ...playlistProviders],
})
export class PlaylistModule {}
