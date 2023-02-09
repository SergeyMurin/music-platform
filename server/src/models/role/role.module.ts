import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { roleProviders } from './role.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
  exports: [RoleService, ...roleProviders],
})
export class RoleModule {}
