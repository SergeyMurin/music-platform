import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { TagAlbumController } from './tag.album.controller';
import { TagAlbumService } from './tag.album.service';
import { tagAlbumProviders } from './tag.album.providers';
import { TagModule } from '../tag.module';

@Module({
  imports: [DatabaseModule, TagModule],
  controllers: [TagAlbumController],
  providers: [TagAlbumService, ...tagAlbumProviders],
  exports: [TagAlbumService, ...tagAlbumProviders],
})
export class TagAlbumModule {}
