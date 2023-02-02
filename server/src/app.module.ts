import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { TrackModule } from './models/track/track.module';
import { UserModule } from './models/user/user.module';
import { PlaylistModule } from './models/playlist/playlist.module';
import { PlaylistTrackModule } from './models/playlist/playlist.track/playlist.track.module';
import { SubscriberModule } from './models/subscriber/subscriber.module';
import { RoleModule } from './models/role/role.module';
import { UserRoleModule } from './models/user/user.role/user.role.module';
import { TagAlbumModule } from './models/tag/tag.album/tag.album.module';
import { TagTrackModule } from './models/tag/tag.track/tag.track.module';
import { TagModule } from './models/tag/tag.module';
import { AlbumModule } from './models/album/album.module';
import { GenreModule } from './models/genre/genre.module';
import { CommentModule } from './models/comment/comment.module';
import { FavoriteModule } from './models/favorite/favorite.module';
import { FavoriteAlbumModule } from './models/favorite/favorite.album/favorite.album.module';
import { FavoriteTrackModule } from './models/favorite/favorite.track/favorite.track.module';
import { RepostModule } from './models/repost/repost.module';
import { AlbumTrackModule } from './models/album/album.track.entity/album.track.module';
import { SharedModule } from './shared/shared.module';
import { DigitalOceanModule } from './digtal.ocean/digita.ocean.module';
import { UserTokenService } from './models/user/user.token/user.token.service';
import { UserTokenModule } from './models/user/user.token/user.token.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    TrackModule,
    UserModule,
    PlaylistModule,
    PlaylistTrackModule,
    SubscriberModule,
    RoleModule,
    UserRoleModule,
    TagAlbumModule,
    TagTrackModule,
    TagModule,
    AlbumModule,
    AlbumTrackModule,
    GenreModule,
    CommentModule,
    FavoriteModule,
    FavoriteAlbumModule,
    FavoriteTrackModule,
    RepostModule,
    SharedModule,
    UserTokenModule,

    MailModule,
    DigitalOceanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
