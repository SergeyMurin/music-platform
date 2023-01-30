import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';
import { RepostModule } from '../repost.module';
import { RepostAlbumController } from './repost.album.controller';
import { RepostAlbumService } from './repost.album.service';
import { repostAlbumProviders } from './repost.album.providers';

@Module({
  imports: [DatabaseModule, RepostModule],
  controllers: [RepostAlbumController],
  providers: [RepostAlbumService, ...repostAlbumProviders],
  exports: [RepostAlbumService, ...repostAlbumProviders],
})
export class RepostAlbumModule {}
