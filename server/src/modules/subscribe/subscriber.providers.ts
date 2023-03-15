import { Subscriber } from './subscriber.entity';

export const subscriberProviders = [
  {
    provide: 'SUBSCRIBER_REPOSITORY',
    useValue: Subscriber,
  },
];
