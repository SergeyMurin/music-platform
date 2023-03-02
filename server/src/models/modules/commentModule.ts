import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/databaseModule';
import { CommentController } from '../controllers/commentController';
import { CommentService } from '../services/commentService';
import { commentProviders } from '../providers/commentProviders';
import { AuthModule } from './authModule';
import { UserRoleModule } from './userRoleModule';
import { TrackModule } from './trackModule';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    UserRoleModule,
    forwardRef(() => TrackModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders],
  exports: [CommentService, ...commentProviders],
})
export class CommentModule {}
