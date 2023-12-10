import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { GoogleDriveModule } from '../../shared/googleDrive/google-drive.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    GoogleDriveModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
