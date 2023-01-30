import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './models/track/track.module';
import { UserModule } from './models/user/user.module';
import { PlaylistModule } from './models/playlist/playlist.module';
import { PlaylistTracksModule } from './models/playlist/playlist.tracks/playlist.tracks.module';
import { SubscriberModule } from './models/subscriber/subscriber.module';
import { RoleModule } from './models/role/role.module';
import { UserRoleModule } from './models/user/user.role/user.role.module';

@Module({
  imports: [
    DatabaseModule,
    TrackModule,
    UserModule,
    PlaylistModule,
    PlaylistTracksModule,
    SubscriberModule,
    RoleModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
