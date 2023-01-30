import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(request: Request, response: Response, dto) {
    try {
      await User.create({ ...dto });
      return response.status(HttpStatus.CREATED).send();
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
