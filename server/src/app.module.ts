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
import { TagAlbumModule } from './models/tag/tag.album/tag.album.module';
import { TagTrackModule } from './models/tag/tag.track/tag.track.module';
import { TagModule } from './models/tag/tag.module';
import { AlbumModule } from './models/album/album.module';
import { GenreModule } from './models/genre/genre.module';
import { CommentModule } from './models/comment/comment.module';

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
    TagAlbumModule,
    TagTrackModule,
    TagModule,
    AlbumModule,
    GenreModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
