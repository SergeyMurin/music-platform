import { forwardRef, Module } from '@nestjs/common';

import { FavoriteModule } from './favoriteModule';
import { DatabaseModule } from '../../database/databaseModule';
import { FavoriteTrackController } from '../controllers/favoriteTrackController';
import { FavoriteTrackService } from '../services/favoriteTrackService';
import { favoriteTrackProviders } from '../providers/favoriteTrackProviders';
import { AuthModule } from './authModule';
import { UserModule } from './userModule';
import { TrackModule } from './trackModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => FavoriteModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavoriteTrackController],
  providers: [FavoriteTrackService, ...favoriteTrackProviders],
  exports: [FavoriteTrackService, ...favoriteTrackProviders],
})
export class FavoriteTrackModule {}
