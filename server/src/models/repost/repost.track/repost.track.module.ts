import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';
import { RepostModule } from '../repost.module';
import { RepostTrackController } from './repost.track.controller';
import { RepostTrackService } from './repost.track.service';
import { repostTrackProviders } from './repost.track.providers';

@Module({
  imports: [DatabaseModule, RepostModule],
  controllers: [RepostTrackController],
  providers: [RepostTrackService, ...repostTrackProviders],
  exports: [RepostTrackService, ...repostTrackProviders],
})
export class RepostTrackModule {}
