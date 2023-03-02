import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/databaseModule';
import { TagTrackController } from '../controllers/tagTrackController';
import { TagTrackService } from '../services/tagTrackService';
import { tagTrackProvider } from '../providers/tagTrackProvider';
import { TagModule } from './tagModule';

@Module({
  imports: [DatabaseModule, TagModule],
  controllers: [TagTrackController],
  providers: [TagTrackService, ...tagTrackProvider],
  exports: [TagTrackService, ...tagTrackProvider],
})
export class TagTrackModule {}
