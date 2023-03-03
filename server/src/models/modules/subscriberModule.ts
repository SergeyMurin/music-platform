import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/databaseModule';
import { SubscriberController } from '../controllers/subscriberController';
import { SubscriberService } from '../services/subscriberService';
import { subscriberProviders } from '../providers/subscriberProviders';
import { UserModule } from './userModule';
import { AuthModule } from './authModule';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [SubscriberController],
  providers: [SubscriberService, ...subscriberProviders],
})
export class SubscriberModule {}
