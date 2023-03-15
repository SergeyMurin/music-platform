import { forwardRef, Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { userRoleProviders } from './user-role.providers';
import { UserModule } from '../user.module';
import { RoleModule } from '../../role/role.module';
import { DatabaseModule } from '../../../shared/database/database.module';
import { AuthModule } from '../../auth/auth.module';
import { JwtStrategy } from '../../../shared/jwt/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserTokenModule } from '../user-token/user-token.module';

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
