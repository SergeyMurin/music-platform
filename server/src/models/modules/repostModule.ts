import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/databaseModule';
import { RepostController } from '../controllers/repostController';
import { RepostService } from '../services/repostService';
import { repostProviders } from '../providers/repostProviders';
import { AuthModule } from './authModule';
import { UserModule } from './userModule';
import { TrackModule } from './trackModule';
import { AlbumModule } from './albumModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [RepostController],
  providers: [RepostService, ...repostProviders],
  exports: [RepostService, ...repostProviders],
})
export class RepostModule {}
