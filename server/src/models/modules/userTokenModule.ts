import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { UserTokenService } from '../services/userTokenService';
import { userTokenProviders } from '../providers/userTokenProviders';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserTokenService, ...userTokenProviders],
  exports: [UserTokenService, ...userTokenProviders],
})
export class UserTokenModule {}
