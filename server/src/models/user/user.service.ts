import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { JwtPayload } from './auth/jwt.payload.model';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../shared/config/config.service';

@Injectable()
export class UserService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async signUp(dto): Promise<UserSignInResponseDto> {
    try {
      const salt = await genSalt(10);
      const password = await hash(dto.password, salt);
      const user = await User.create({ ...dto, password });

      const token = await this.signToken(user);
      return new UserSignInResponseDto(user, token);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(error.errors[0], HttpStatus.CONFLICT);
      }

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne<User>({
      where: { email },
    });
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
