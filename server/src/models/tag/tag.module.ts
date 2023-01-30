import { Module } from '@nestjs/common';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { tagProviders } from './tag.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [TagService, ...tagProviders],
  exports: [TagService, ...tagProviders],
})
export class TagModule {}
