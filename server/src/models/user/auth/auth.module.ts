import { Module } from '@nestjs/common';
import { UserTokenModule } from '../user.token/user.token.module';
import { MailModule } from '../../../mail/mail.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user.module';
import { UserRoleModule } from '../user.role/user.role.module';

@Module({
  imports: [UserTokenModule, MailModule, UserModule, UserRoleModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [],
})
export class AuthModule {}
