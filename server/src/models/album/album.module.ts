import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { albumProviders } from './album.providers';

@Module({
  imports: [DatabaseModule, TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, ...albumProviders],
})
export class AlbumModule {}
