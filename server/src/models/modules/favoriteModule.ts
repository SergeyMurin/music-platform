import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/databaseModule';
import { FavoriteService } from '../services/favoriteService';
import { FavoriteController } from '../controllers/favoriteController';
import { favoriteProviders } from '../providers/favoriteProviders';
import { AuthModule } from './authModule';
import { UserModule } from './userModule';
import { TrackModule } from './trackModule';
import { FavoriteTrackModule } from './favoriteTrackModule';
import { FavoriteAlbumModule } from './favoriteAlbumModule';
import { AlbumModule } from './albumModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoriteTrackModule),
    forwardRef(() => FavoriteAlbumModule),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, ...favoriteProviders],
  exports: [FavoriteService, ...favoriteProviders],
})
export class FavoriteModule {}
