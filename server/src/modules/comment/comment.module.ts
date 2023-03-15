import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/database.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { commentProviders } from './comment.providers';
import { AuthModule } from '../auth/auth.module';
import { UserRoleModule } from '../user/user-role/user-role.module';
import { TrackModule } from '../track/track.module';

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
