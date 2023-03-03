import { forwardRef, Module } from '@nestjs/common';

import { FavoriteAlbumController } from '../controllers/favoriteAlbumController';
import { FavoriteAlbumService } from '../services/favoriteAlbumService';
import { favoriteAlbumProviders } from '../providers/favoriteAlbumProviders';
import { FavoriteModule } from './favoriteModule';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { UserModule } from './userModule';
import { AlbumModule } from './albumModule';
import { AuthModule } from './authModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => FavoriteModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService, ...favoriteAlbumProviders],
  exports: [FavoriteAlbumService, ...favoriteAlbumProviders],
})
export class FavoriteAlbumModule {}
