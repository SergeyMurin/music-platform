import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './models/track/track.module';
import { UserModule } from './models/user/user.module';
import { PlaylistModule } from './models/playlist/playlist.module';
import { PlaylistTracksModule } from './models/playlist.tracks/playlist.tracks.module';

@Module({
  imports: [
    DatabaseModule,
    TrackModule,
    UserModule,
    PlaylistModule,
    PlaylistTracksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
