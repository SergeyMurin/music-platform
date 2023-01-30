import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { AlbumTrackController } from './album.track.controller';
import { AlbumTrackService } from './album.track.service';
import { albumTrackProviders } from './album.track.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumTrackController],
  providers: [AlbumTrackService, ...albumTrackProviders],
  exports: [AlbumTrackService],
})
export class AlbumTrackModule {}
