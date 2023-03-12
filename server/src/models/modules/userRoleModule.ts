import { forwardRef, Module } from '@nestjs/common';
import { UserRoleController } from '../controllers/userRoleController';
import { UserRoleService } from '../services/userRoleService';
import { userRoleProviders } from '../providers/userRoleProviders';
import { UserModule } from './userModule';
import { RoleModule } from './roleModule';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { AuthModule } from './authModule';
import { JwtStrategy } from '../../shared/jwt/jwtStrategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserTokenModule } from './userTokenModule';

@Module({
  imports: [
    UserTokenModule,
    DatabaseModule,
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService, ...userRoleProviders, JwtStrategy, JwtService],
  exports: [UserRoleService, ...userRoleProviders],
})
export class UserRoleModule {}
