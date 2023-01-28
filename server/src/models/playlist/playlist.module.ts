import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { playlistProviders } from './playlist.providers';
import { PlaylistTracksService } from '../playlist.tracks/playlist.tracks.service';
import { PlaylistTracksModule } from '../playlist.tracks/playlist.tracks.module';
import { playlistTracksProviders } from '../playlist.tracks/playlist.tracks.providers';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [DatabaseModule, PlaylistTracksModule, TrackModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, ...playlistProviders],
})
export class PlaylistModule {}
