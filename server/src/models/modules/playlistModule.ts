import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { PlaylistController } from '../controllers/playlistController';
import { PlaylistService } from '../services/playlistService';
import { playlistProviders } from '../providers/playlistProviders';
import { PlaylistTrackModule } from './playlistTrackModule';
import { TrackModule } from './trackModule';
import { AuthModule } from './authModule';
import { DigitalOceanModule } from '../../shared/digitalOcean/digitalOceanModule';
import { UserModule } from './userModule';

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
