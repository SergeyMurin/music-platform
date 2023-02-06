import { forwardRef, Module } from '@nestjs/common';

import { FavoriteAlbumController } from './favorite.album.controller';
import { FavoriteAlbumService } from './favorite.album.service';
import { favoriteAlbumProviders } from './favorite.album.providers';
import { FavoriteModule } from '../favorite.module';
import { DatabaseModule } from '../../../database/database.module';
import { UserModule } from '../../user/user.module';
import { AlbumModule } from '../../album/album.module';
import { AuthModule } from '../../user/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => FavoriteModule),
    AuthModule,
    UserModule,
    AlbumModule,
  ],
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService, ...favoriteAlbumProviders],
  exports: [FavoriteAlbumService, ...favoriteAlbumProviders],
})
export class FavoriteAlbumModule {}
