import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { albumProviders } from './album.providers';
import { Album } from './album.entity';

@Module({
  imports: [DatabaseModule, TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, ...albumProviders],
  exports: [AlbumService, ...albumProviders],
})
export class AlbumModule {}
