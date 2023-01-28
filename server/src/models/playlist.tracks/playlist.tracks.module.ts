import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlaylistTracksController } from './playlist.tracks.controller';
import { PlaylistTracksService } from './playlist.tracks.service';
import { playlistTracksProviders } from './playlist.tracks.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistTracksController],
  providers: [PlaylistTracksService, ...playlistTracksProviders],
  exports: [PlaylistTracksService],
})
export class PlaylistTracksModule {}
