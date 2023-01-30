import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { favoriteProviders } from './favorite.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, ...favoriteProviders],
  exports: [FavoriteService, ...favoriteProviders],
})
export class FavoriteModule {}
