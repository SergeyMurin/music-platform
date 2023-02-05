import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { subscriberProviders } from './subscriber.providers';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../user/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [SubscriberController],
  providers: [SubscriberService, ...subscriberProviders],
})
export class SubscriberModule {}
