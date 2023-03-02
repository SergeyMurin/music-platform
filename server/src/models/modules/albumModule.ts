import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/databaseModule';
import { TrackModule } from './trackModule';
import { AlbumController } from '../controllers/albumController';
import { AlbumService } from '../services/albumService';
import { albumProviders } from '../providers/albumProviders';
import { DigitalOceanModule } from '../../digitalOcean/digitalOceanModule';
import { TagModule } from './tagModule';
import { GenreAlbumModule } from './genreAlbumModule';
import { UserModule } from './userModule';
import { AuthModule } from './authModule';
import { TagAlbumModule } from './tagAlbumModule';
import { AlbumTrackModule } from './albumTrackModule';
import { FavoriteTrackModule } from './favoriteTrackModule';
import { FavoriteAlbumModule } from './favoriteAlbumModule';
import { TrackService } from '../services/trackService';
import { TagTrackModule } from './tagTrackModule';
import { GenreTrackModule } from './genreTrackModule';
import { CommentModule } from './commentModule';
import { RepostModule } from './repostModule';

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
