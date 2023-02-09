import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { AuthModule } from './auth/auth.module';
import { DigitalOceanModule } from '../../digtal.ocean/digita.ocean.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), DigitalOceanModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
