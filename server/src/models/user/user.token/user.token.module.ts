import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { UserTokenService } from './user.token.service';
import { userTokenProviders } from './user.token.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserTokenService, ...userTokenProviders],
})
export class UserTokenModule {}
