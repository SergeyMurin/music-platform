import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { GoogleStrategy } from './auth/google/google.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, GoogleStrategy],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
