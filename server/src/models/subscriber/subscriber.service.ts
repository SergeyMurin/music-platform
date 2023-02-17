import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Subscriber } from './subscriber.entity';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth/auth.service';

@Injectable()
export class SubscriberService {
  constructor(
    @Inject('SUBSCRIBER_REPOSITORY')
    private subscriberRepository: typeof Subscriber,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async getSubscriber(user_id, subscriber_id) {
    return await this.subscriberRepository.findOne({
      where: {
        on_whom_user_id: user_id,
        who_user_id: subscriber_id,
      },
    });
  }

  async getSubscription(user_id, subscription_id) {
    return await this.subscriberRepository.findOne({
      where: {
        on_whom_user_id: subscription_id,
        who_user_id: user_id,
      },
    });
  }

  async getAllSubscriptions(id: string) {
    const subscribers = await this.subscriberRepository.findAll({
      where: { who_user_id: id },
      order: [['createdAt', 'DESC']],
    });

    return await Promise.all(
      subscribers.map(async (subscriber) => {
        return await this.userService.getById(subscriber.on_whom_user_id);
      }),
    );
  }

  async getAllSubscribers(id: string) {
    const subscribers = await this.subscriberRepository.findAll({
      where: { on_whom_user_id: id },
      order: [['createdAt', 'DESC']],
    });

    return await Promise.all(
      subscribers.map(async (subscriber) => {
        return await this.userService.getById(subscriber.who_user_id);
      }),
    );
  }

  async subscribe(token, dto) {
    const jwtPayload = await this.authService.verifyToken(token);
    if (await this.getSubscription(jwtPayload.user_id, dto.user_id)) {
      throw new HttpException('Already subscribed', HttpStatus.BAD_REQUEST);
    }

    const whoUser = await this.userService.getById(jwtPayload.user_id);
    if (!whoUser) {
      throw new HttpException(
        `Cannot find user with id ${jwtPayload.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const onWhomUser = await this.userService.getById(dto.user_id);
    if (!onWhomUser) {
      throw new HttpException(
        `Cannot find user with od ${dto.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (whoUser.id === onWhomUser.id) {
      throw new HttpException(
        'Cannot subscribe to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.subscriberRepository.create({
      who_user_id: whoUser.id,
      on_whom_user_id: onWhomUser.id,
    });
    whoUser.subscriptions_count++;
    onWhomUser.subscribers_count++;
    await whoUser.save();
    await onWhomUser.save();

    return {
      who_user_id: whoUser.id,
      on_whom_user_id: onWhomUser.id,
    };
  }

  async removeSubscribe(token, dto) {
    const jwtPayload = await this.authService.verifyToken(token);
    if (!(await this.getSubscription(jwtPayload.user_id, dto.user_id))) {
      throw new HttpException('Already unsubscribed', HttpStatus.BAD_REQUEST);
    }

    const whoUser = await this.userService.getById(jwtPayload.user_id);
    if (!whoUser) {
      throw new HttpException(
        `Cannot find user with id ${jwtPayload.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const onWhomUser = await this.userService.getById(dto.user_id);
    if (!onWhomUser) {
      throw new HttpException(
        `Cannot find user with od ${dto.user_id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (whoUser.id === onWhomUser.id) {
      throw new HttpException(
        'Cannot unsubscribe from yourself',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.subscriberRepository.destroy({
      where: { who_user_id: whoUser.id, on_whom_user_id: onWhomUser.id },
    });

    whoUser.subscriptions_count--;
    onWhomUser.subscribers_count--;
    await whoUser.save();
    await onWhomUser.save();

    return {
      who_user_id: whoUser.id,
      on_whom_user_id: onWhomUser.id,
    };
  }
}
