import { Module } from '@nestjs/common';

import { TagController } from '../controllers/tagController';
import { TagService } from '../services/tagService';
import { tagProviders } from '../providers/tagProviders';
import { DatabaseModule } from '../../database/databaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [TagService, ...tagProviders],
  exports: [TagService, ...tagProviders],
})
export class TagModule {}
