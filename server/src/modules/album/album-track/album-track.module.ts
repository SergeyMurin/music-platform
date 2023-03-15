import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../../shared/database/database.module';
import { AlbumTrackController } from './album-track.controller';
import { AlbumTrackService } from './album-track.service';
import { albumTrackProviders } from './album-track.providers';
import { AlbumModule } from '../album.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AlbumModule)],
  controllers: [AlbumTrackController],
  providers: [AlbumTrackService, ...albumTrackProviders],
  exports: [AlbumTrackService, ...albumTrackProviders],
})
export class AlbumTrackModule {}
