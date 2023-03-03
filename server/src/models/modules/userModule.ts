import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { UserService } from '../services/userService';
import { userProviders } from '../providers/userProviders';
import { UserController } from '../controllers/userController';
import { AuthModule } from './authModule';
import { DigitalOceanModule } from '../../shared/digitalOcean/digitalOceanModule';
import { TrackModule } from './trackModule';
import { AlbumModule } from './albumModule';

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
