import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserTokenModule } from './user.token/user.token.module';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [DatabaseModule, UserTokenModule, MailModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, JwtStrategy, JwtService],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
