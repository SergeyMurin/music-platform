import { Inject, Injectable } from '@nestjs/common';
import { UserToken } from './user.token.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @Inject('USER_TOKEN_REPOSITORY')
    private userTokenRepository: typeof UserToken,
  ) {}
}