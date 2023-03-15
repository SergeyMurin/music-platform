import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { DigitalOceanModule } from '../../shared/digitalOcean/digital-ocean.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    DigitalOceanModule,
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
