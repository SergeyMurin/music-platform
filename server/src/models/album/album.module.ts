import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { albumProviders } from './album.providers';
import { DigitalOceanModule } from '../../digtal.ocean/digita.ocean.module';
import { TagModule } from '../tag/tag.module';
import { GenreAlbumModule } from '../genre/genre.album/genre.album.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../user/auth/auth.module';
import { TagAlbumModule } from '../tag/tag.album/tag.album.module';
import { AlbumTrackModule } from './album.track/album.track.module';
import { FavoriteTrackModule } from '../favorite/favorite.track/favorite.track.module';
import { FavoriteAlbumModule } from '../favorite/favorite.album/favorite.album.module';
import { TrackService } from '../track/track.service';
import { TagTrackModule } from '../tag/tag.track/tag.track.module';
import { GenreTrackModule } from '../genre/genre.track/genre.track.module';
import { CommentModule } from '../comment/comment.module';
import { RepostModule } from '../repost/repost.module';

@Module({
  imports: [
    forwardRef(() => AlbumTrackModule),
    forwardRef(() => TrackModule),
    DatabaseModule,
    DigitalOceanModule,
    TagModule,
    TagAlbumModule,
    TagTrackModule,
    GenreTrackModule,
    GenreAlbumModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    FavoriteAlbumModule,
    FavoriteTrackModule,
    CommentModule,
    RepostModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ...albumProviders, TrackService],
  exports: [AlbumService, ...albumProviders],
})
export class AlbumModule {}
