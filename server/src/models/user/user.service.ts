import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Track } from '../track/track.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(request, response) {
    try {
      await User.create({
        login: 'bb',
      });

      response.status(HttpStatus.CREATED).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
