import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/database.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { favoriteProviders } from './favorite.providers';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TrackModule } from '../track/track.module';
import { FavoriteTrackModule } from './favorite-track/favorite-track.module';
import { FavoriteAlbumModule } from './favorite-album/favorite-album.module';
import { AlbumModule } from '../album/album.module';

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
