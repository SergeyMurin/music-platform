import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { RepostController } from './repost.controller';
import { RepostService } from './repost.service';
import { repostProviders } from './repost.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RepostController],
  providers: [RepostService, ...repostProviders],
  exports: [RepostService, ...repostProviders],
})
export class RepostModule {}
