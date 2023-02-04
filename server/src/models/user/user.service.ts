import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async getById(id: string) {
    return await this.userRepository.findOne<User>({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne<User>({
      where: { email },
    });
  }
}
