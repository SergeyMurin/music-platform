import { Subscriber } from '../entities/subscriberEntity';

export const subscriberProviders = [
  {
    provide: 'SUBSCRIBER_REPOSITORY',
    useValue: Subscriber,
  },
];
