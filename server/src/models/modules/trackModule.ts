import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { TrackService } from '../services/trackService';
import { trackProviders } from '../providers/trackProviders';
import { TrackController } from '../controllers/trackController';
import { AuthModule } from './authModule';
import { TagTrackModule } from './tagTrackModule';
import { GenreTrackModule } from './genreTrackModule';
import { DigitalOceanModule } from '../../shared/digitalOcean/digitalOceanModule';
import { TagModule } from './tagModule';
import { UserModule } from './userModule';
import { AlbumTrackModule } from './albumTrackModule';
import { AlbumModule } from './albumModule';
import { CommentModule } from './commentModule';
import { FavoriteTrackModule } from './favoriteTrackModule';
import { RepostModule } from './repostModule';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TagTrackModule,
    DigitalOceanModule,
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
