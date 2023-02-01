import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { JwtPayload } from './auth/jwt.payload.model';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../shared/config/config.service';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { OAuth2Client } from 'google-auth-library';

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

  /**
   * Google authorization. Creates a new user, if necessary, and adds it to the database
   * @param {string} token token from Google
   * @returns {Promise<UserSignInResponseDto>}
   */
  async googleSignIn(token) {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    try {
      if (!payload) {
        return;
      }
      const existingUser = await this.getUserByEmail(payload.email);
      if (existingUser) {
        const token = await this.signToken(existingUser);
        return new UserSignInResponseDto(existingUser, token);
      }
      const user = await User.create({
        email: payload.email,
        email_confirmed: payload.email_verified,
        username: payload.name,
        picture_url: payload.picture,
        google_auth: true,
      });

      const token = await this.signToken(user);
      return new UserSignInResponseDto(user, token);
    } catch (error) {
      throw new HttpException(
        error.errors[0].message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signUp(dto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
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

      throw new HttpException(
        error.errors[0],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
