import { Module } from '@nestjs/common';
import { UserTokenModule } from '../user/user-token/user-token.module';
import { MailModule } from '../../shared/mail/mail.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../shared/jwt/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user/user-role/user-role.module';

@Module({
  imports: [UserTokenModule, MailModule, UserModule, UserRoleModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
