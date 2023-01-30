import { Inject, Injectable } from '@nestjs/common';
import { Subscriber } from './subscriber.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('SUBSCRIBER_REPOSITORY')
    private subscriberRepository: typeof Subscriber,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async subscribe(query, request, response) {
    try {
      const userId = query.user_id;
      const subscribeId = query.subscribe_id;
      const user = await this.userRepository.findByPk(userId);
      const subscribe = await this.userRepository.findByPk(subscribeId);
      await this.subscriberRepository.create({
        id: userId,
        user_id: subscribeId,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
