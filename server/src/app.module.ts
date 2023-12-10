import { Module } from '@nestjs/common';

import { DatabaseModule } from './shared/database/database.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { PlaylistTrackModule } from './modules/playlist/playlist-track/playlist-track.module';
import { SubscribeModule } from './modules/subscribe/subscribe.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user/user-role/user-role.module';
import { TagAlbumModule } from './modules/tag/tag-album/tag-album.module';
import { TagTrackModule } from './modules/tag/tag-track/tag-track.module';
import { TagModule } from './modules/tag/tag.module';
import { AlbumModule } from './modules/album/album.module';
import { GenreModule } from './modules/genre/genre.module';
import { CommentModule } from './modules/comment/comment.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { FavoriteAlbumModule } from './modules/favorite/favorite-album/favorite-album.module';
import { FavoriteTrackModule } from './modules/favorite/favorite-track/favorite-track.module';
import { RepostModule } from './modules/repost/repost.module';
import { AlbumTrackModule } from './modules/album/album-track/album-track.module';
import { SharedModule } from './shared/shared.module';
import { DigitalOceanModule } from './shared/digitalOcean/digital-ocean.module';
import { UserTokenModule } from './modules/user/user-token/user-token.module';
import { MailModule } from './shared/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreTrackModule } from './modules/genre/genre-track/genre-track.module';
import { GenreAlbumModule } from './modules/genre/genre-album/genre-album.module';
import { GoogleDriveModule } from './shared/googleDrive/google-drive.module';

@Module({
  imports: [
    DatabaseModule,
    TrackModule,
    UserModule,
    PlaylistModule,
    PlaylistTrackModule,
    SubscribeModule,
    RoleModule,
    UserRoleModule,

    TagAlbumModule,
    TagTrackModule,
    TagModule,

    AlbumModule,
    AlbumTrackModule,
    GenreModule,
    GenreTrackModule,
    GenreAlbumModule,
    CommentModule,
    FavoriteModule,
    FavoriteAlbumModule,
    FavoriteTrackModule,
    RepostModule,
    SharedModule,
    UserTokenModule,

    AuthModule,
    MailModule,
    DigitalOceanModule,
    GoogleDriveModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
