import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/databaseModule';
import { UserModule } from './userModule';
import { RoleController } from '../controllers/roleController';
import { RoleService } from '../services/roleService';
import { roleProviders } from '../providers/roleProviders';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
  exports: [RoleService, ...roleProviders],
})
export class RoleModule {}
