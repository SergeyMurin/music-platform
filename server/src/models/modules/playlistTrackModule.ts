import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/databaseModule';
import { PlaylistTrackController } from '../controllers/playlistTrackController';
import { PlaylistTrackService } from '../services/playlistTrackService';
import { playlistTrackProviders } from '../providers/playlistTrackProviders';

@Module({
  imports: [DatabaseModule],
  controllers: [PlaylistTrackController],
  providers: [PlaylistTrackService, ...playlistTrackProviders],
  exports: [PlaylistTrackService],
})
export class PlaylistTrackModule {}
