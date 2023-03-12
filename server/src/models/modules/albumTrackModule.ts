import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { AlbumTrackController } from '../controllers/albumTrackController';
import { AlbumTrackService } from '../services/albumTrackService';
import { albumTrackProvider } from '../providers/albumTrackProvider';
import { AlbumModule } from './albumModule';

@Module({
  imports: [DatabaseModule, forwardRef(() => AlbumModule)],
  controllers: [AlbumTrackController],
  providers: [AlbumTrackService, ...albumTrackProvider],
  exports: [AlbumTrackService, ...albumTrackProvider],
})
export class AlbumTrackModule {}
