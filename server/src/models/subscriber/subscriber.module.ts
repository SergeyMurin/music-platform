import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { subscriberProviders } from './subscriber.providers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [SubscriberController],
  providers: [SubscriberService, ...subscriberProviders],
})
export class SubscriberModule {}
