import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { playlistProviders } from './playlist.providers';
import { PlaylistTrackModule } from './playlist.track/playlist.track.module';
import { TrackModule } from '../track/track.module';
import { AuthModule } from '../user/auth/auth.module';
import { DigitalOceanModule } from '../../digtal.ocean/digita.ocean.module';

@Module({
  imports: [
    DatabaseModule,
    PlaylistTrackModule,
    TrackModule,
    AuthModule,
    DigitalOceanModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, ...playlistProviders],
})
export class PlaylistModule {}
