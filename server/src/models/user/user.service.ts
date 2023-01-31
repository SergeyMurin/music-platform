import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { JwtPayload } from './auth/jwt/jwt.payload.model';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../shared/config/config.service';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';

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

  async googleSignIn(req) {
    try {
      if (!req.user) {
        return;
      }
      const existingUser = await this.getUserByEmail(req.user.email);
      if (existingUser) {
        const token = await this.signToken(existingUser);
        return new UserSignInResponseDto(existingUser, token);
      }

      const user = await User.create({
        email: req.user.email,
        email_confirmed: true,
        username: req.user.firstName,
        picture_url: req.user.picture,
        google_auth: true,
      });

      const token = await this.signToken(user);
      return new UserSignInResponseDto(user, token);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  async signIn(dto: UserSignInRequestDto) {
    const email = dto.email;
    const password = dto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('Invalid email.', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid password.', HttpStatus.BAD_REQUEST);
    }

    const token = await this.signToken(user);
    return new UserSignInResponseDto(user, token);
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
