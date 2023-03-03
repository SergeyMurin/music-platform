import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { TagAlbumController } from '../controllers/tagAlbumController';
import { TagAlbumService } from '../services/tagAlbumService';
import { tagAlbumProviders } from '../providers/tagAlbumProviders';
import { TagModule } from './tagModule';

@Module({
  imports: [DatabaseModule, TagModule],
  controllers: [TagAlbumController],
  providers: [TagAlbumService, ...tagAlbumProviders],
  exports: [TagAlbumService, ...tagAlbumProviders],
})
export class TagAlbumModule {}
