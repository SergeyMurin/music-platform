import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { favoriteProviders } from './favorite.providers';
import { AuthModule } from '../user/auth/auth.module';
import { UserModule } from '../user/user.module';
import { TrackModule } from '../track/track.module';
import { FavoriteTrackModule } from './favorite.track/favorite.track.module';
import { FavoriteAlbumModule } from './favorite.album/favorite.album.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    TrackModule,
    forwardRef(() => FavoriteTrackModule),
    forwardRef(() => FavoriteAlbumModule),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, ...favoriteProviders],
  exports: [FavoriteService, ...favoriteProviders],
})
export class FavoriteModule {}
