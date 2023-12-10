import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { TrackService } from './track.service';
import { trackProviders } from './track.providers';
import { TrackController } from './track.controller';
import { AuthModule } from '../auth/auth.module';
import { TagTrackModule } from '../tag/tag-track/tag-track.module';
import { GenreTrackModule } from '../genre/genre-track/genre-track.module';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { AlbumTrackModule } from '../album/album-track/album-track.module';
import { AlbumModule } from '../album/album.module';
import { CommentModule } from '../comment/comment.module';
import { FavoriteTrackModule } from '../favorite/favorite-track/favorite-track.module';
import { RepostModule } from '../repost/repost.module';
import { GoogleDriveModule } from '../../shared/googleDrive/google-drive.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TagTrackModule,
    GoogleDriveModule,
    //DigitalOceanModule,
    TagModule,
    UserModule,
    AlbumTrackModule,
    AlbumModule,
    CommentModule,
    FavoriteTrackModule,
    GenreTrackModule,
    RepostModule,
  ],
  controllers: [TrackController],
  providers: [TrackService, ...trackProviders],
  exports: [TrackService, ...trackProviders],
})
export class TrackModule {}
