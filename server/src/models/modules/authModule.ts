import { Module } from '@nestjs/common';
import { UserTokenModule } from './userTokenModule';
import { MailModule } from '../../shared/mail/mailModule';
import { AuthService } from '../services/authService';
import { AuthController } from '../controllers/authController';
import { JwtStrategy } from '../../shared/jwt/jwtStrategy';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './userModule';
import { UserRoleModule } from './userRoleModule';

@Module({
  imports: [UserTokenModule, MailModule, UserModule, UserRoleModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
