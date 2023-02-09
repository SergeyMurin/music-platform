import { forwardRef, Module } from '@nestjs/common';

import { FavoriteModule } from '../favorite.module';
import { DatabaseModule } from '../../../database/database.module';
import { FavoriteTrackController } from './favorite.track.controller';
import { FavoriteTrackService } from './favorite.track.service';
import { favoriteTrackProviders } from './favorite.track.providers';
import { AuthModule } from '../../user/auth/auth.module';
import { UserModule } from '../../user/user.module';
import { TrackModule } from '../../track/track.module';

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
