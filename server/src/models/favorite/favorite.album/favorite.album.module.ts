import { Module } from '@nestjs/common';

import { FavoriteAlbumController } from './favorite.album.controller';
import { FavoriteAlbumService } from './favorite.album.service';
import { favoriteAlbumProviders } from './favorite.album.providers';
import { FavoriteModule } from '../favorite.module';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule, FavoriteModule],
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService, ...favoriteAlbumProviders],
  exports: [FavoriteAlbumService, ...favoriteAlbumProviders],
})
export class FavoriteAlbumModule {}
