import { Module } from '@nestjs/common';

import { FavoriteModule } from '../favorite.module';
import { DatabaseModule } from '../../../database/database.module';
import { FavoriteTrackController } from './favorite.track.controller';
import { FavoriteTrackService } from './favorite.track.service';
import { favoriteTrackProviders } from './favorite.track.providers';

@Module({
  imports: [DatabaseModule, FavoriteModule],
  controllers: [FavoriteTrackController],
  providers: [FavoriteTrackService, ...favoriteTrackProviders],
  exports: [FavoriteTrackService, ...favoriteTrackProviders],
})
export class FavoriteTrackModule {}
