import { Module } from '@nestjs/common';
import { UserRoleController } from './user.role.controller';
import { UserRoleService } from './user.role.service';
import { userRoleProviders } from './user.role.providers';
import { UserModule } from '../user.module';
import { RoleModule } from '../../role/role.module';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, RoleModule],
  controllers: [UserRoleController],
  providers: [UserRoleService, ...userRoleProviders],
  exports: [UserRoleService, ...userRoleProviders],
})
export class UserRoleModule {}
