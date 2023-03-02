import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/databaseModule';
import { TrackModule } from './models/modules/trackModule';
import { UserModule } from './models/modules/userModule';
import { PlaylistModule } from './models/modules/playlistModule';
import { PlaylistTrackModule } from './models/modules/playlistTrackModule';
import { SubscriberModule } from './models/modules/subscriberModule';
import { RoleModule } from './models/modules/roleModule';
import { UserRoleModule } from './models/modules/userRoleModule';
import { TagAlbumModule } from './models/modules/tagAlbumModule';
import { TagTrackModule } from './models/modules/tagTrackModule';
import { TagModule } from './models/modules/tagModule';
import { AlbumModule } from './models/modules/albumModule';
import { GenreModule } from './models/modules/genreModule';
import { CommentModule } from './models/modules/commentModule';
import { FavoriteModule } from './models/modules/favoriteModule';
import { FavoriteAlbumModule } from './models/modules/favoriteAlbumModule';
import { FavoriteTrackModule } from './models/modules/favoriteTrackModule';
import { RepostModule } from './models/modules/repostModule';
import { AlbumTrackModule } from './models/modules/albumTrackModule';
import { SharedModule } from './shared/sharedModule';
import { DigitalOceanModule } from './digitalOcean/digitalOceanModule';
import { UserTokenModule } from './models/modules/userTokenModule';
import { MailModule } from './mail/mailModule';
import { AuthModule } from './models/modules/authModule';
import { GenreTrackModule } from './models/modules/genreTrackModule';
import { GenreAlbumModule } from './models/modules/genreAlbumModule';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
