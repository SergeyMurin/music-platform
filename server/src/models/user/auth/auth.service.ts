import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { ConfigService } from '../../../shared/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { UserTokenService } from '../user.token/user.token.service';
import { MailService } from '../../../mail/mail.service';
import { OAuth2Client } from 'google-auth-library';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { UserToken } from '../user.token/user.token.entity';
import { JwtPayload } from './jwt/jwt.payload.model';
import { sign } from 'jsonwebtoken';

import process from 'process';
import * as dotenv from 'dotenv';
import { UserService } from '../user.service';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';

dotenv.config();

@Injectable()
export class AuthService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('USER_TOKEN_REPOSITORY')
    private userTokenRepository: typeof UserToken,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly tokenService: UserTokenService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
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
      const existingUser = await this.userService.getUserByEmail(payload.email);
      if (existingUser) {
        const token = await this.signToken(existingUser);
        return new UserSignInResponseDto(existingUser, token);
      }
      const user = await this.userRepository.create({
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

  /**
   * Create new user with token and sends confirmation email
   * @param {UserSignInRequestDto} dto
   * @returns {Promise<UserSignInResponseDto>}
   */
  async signUp(dto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    try {
      const salt = await genSalt(10);
      const password = await hash(dto.password, salt);
      const user = await this.userRepository.create({ ...dto, password });

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

  /**
   * Validates request after that returning userinfo
   * @param {UserSignInRequestDto} dto
   * @returns {Promise<UserSignInResponseDto>}
   */
  async signIn(dto: UserSignInRequestDto) {
    const email = dto.email;
    const password = dto.password;

    const user = await this.userService.getUserByEmail(email);
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

  /**
   * After redirecting to client from confirmation mail must be called confirm() that confirms user account
   * @param {string} token user token from UserTokens
   * @returns {Promise<User>}
   */
  async confirm(token: string) {
    try {
      const data = await this.verifyToken(token);
      const user = await this.userRepository.findOne<User>({
        where: { id: data.user_id },
      });

      if (user && !user.email_confirmed) {
        user.email_confirmed = true;
        return await user.save();
      }
      new HttpException('Confirmation error', HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Sends email with link to confirm controller using MailService
   * @param {User} user User entity
   * @returns {Promise<void>} if without errors then complete
   */
  async sendConfirmation(user: User) {
    const userToken: UserToken = await this.tokenService.find(user.id);
    if (!userToken) {
      throw new HttpException(
        'Cannot find user token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const confirmLink = `${process.env.CLIENT_URI}/auth/confirm?token=${userToken.token}`;
    await this.mailService.sendConfirmationEmail(
      user.email,
      'Confirm Your Email',
      confirmLink,
    );
  }

  private async signToken(user: User) {
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.getUserByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    const token = await this.tokenService.find(user.id);
    const resetLink = `${process.env.CLIENT_URI}/auth/reset-password?token=${token.token}`;

    await this.mailService.sendResetPasswordEmail(
      user.email,
      'Reset password',
      resetLink,
    );
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    try {
      const salt = await genSalt(10);
      const password = await hash(resetPasswordDto.password, salt);

      const userToken = await this.userTokenRepository.findOne({
        where: {
          token,
        },
      });

      const user = await this.userRepository.findOne({
        where: {
          id: userToken.user_id,
        },
      });
      user.password = password;
      await user.save();
      return true;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
