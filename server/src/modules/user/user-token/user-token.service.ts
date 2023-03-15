import { Inject, Injectable } from '@nestjs/common';
import { UserToken } from './user-token.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @Inject('USER_TOKEN_REPOSITORY')
    private userTokenRepository: typeof UserToken,
  ) {}

  async create(user_id: string, token: string): Promise<UserToken> {
    try {
      return await this.userTokenRepository.create({
        user_id,
        token,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async delete(user_id: string) {
    return !!(await this.userTokenRepository.destroy({
      where: {
        user_id,
      },
    }));
  }

  async find(user_id: string) {
    return await this.userTokenRepository.findOne({
      where: {
        user_id,
      },
    });
  }

  async update(user_id: string, token: string) {
    const userToken = await this.exists(user_id, token);
    if (userToken) {
      userToken.token = token;
      await userToken.save();
    }
  }

  async exists(user_id: string, token: string): Promise<UserToken> {
    return await this.userTokenRepository.findOne({
      where: { user_id, token },
    });
  }
}
