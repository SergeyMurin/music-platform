import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from './user.entity';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { JwtPayload } from './auth/jwt.payload.model';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../shared/config/config.service';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UserTokenService } from './user.token/user.token.service';
import { UserToken } from './user.token/user.token.entity';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { MailService } from '../../mail/mail.service';

dotenv.config();

@Injectable()
export class UserService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly tokenService: UserTokenService,
    private readonly mailService: MailService,
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
      await this.tokenService.create(user.id, token);
      await this.sendConfirmation(user);

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

  async confirm(token: string) {
    try {
      const data = await this.verifyToken(token);
      const user = await this.userRepository.findOne<User>({
        where: { id: data.user_id },
      });

      //await this.tokenService.delete(data.user_id);

      if (user && !user.email_confirmed) {
        user.email_confirmed = true;
        return await user.save();
      }
      throw new HttpException('Confirmation error', HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendConfirmation(user: User) {
    const userToken: UserToken = await this.tokenService.find(user.id);
    if (!userToken) {
      throw new HttpException(
        'Cannot find user token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const confirmLink = `${process.env.CLIENT_URI}/user/confirm?token=${userToken.token}`;
    await this.mailService.sendConfirmationEmail(
      user.email,
      'Confirm Your Email',
      confirmLink,
    );
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne<User>({
      where: { email },
    });
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      user_id: user.id,
    };
    return sign(payload, this.jwtPrivateKey, {});
  }

  private async verifyToken(token): Promise<JwtPayload> {
    const data = this.jwtService.verify(token, {
      secret: this.jwtPrivateKey,
    }) as JwtPayload;
    const tokenExists = await this.tokenService.exists(data.user_id, token);
    if (tokenExists) {
      return data;
    }
    throw new HttpException("Token doesn't exist", HttpStatus.BAD_REQUEST);
  }
}
