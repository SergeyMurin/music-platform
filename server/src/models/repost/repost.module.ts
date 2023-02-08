import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { RepostController } from './repost.controller';
import { RepostService } from './repost.service';
import { repostProviders } from './repost.providers';
import { AuthModule } from '../user/auth/auth.module';
import { UserModule } from '../user/user.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [RepostController],
  providers: [RepostService, ...repostProviders],
  exports: [RepostService, ...repostProviders],
})
export class RepostModule {}
