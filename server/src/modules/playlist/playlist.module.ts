import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { playlistProviders } from './playlist.providers';
import { PlaylistTrackModule } from './playlist-track/playlist-track.module';
import { TrackModule } from '../track/track.module';
import { AuthModule } from '../auth/auth.module';
import { DigitalOceanModule } from '../../shared/digitalOcean/digital-ocean.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    PlaylistTrackModule,
    TrackModule,
    AuthModule,
    UserModule,
    DigitalOceanModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, ...playlistProviders],
})
export class PlaylistModule {}
