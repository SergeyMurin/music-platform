import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from './user.entity';
import { GetUserDto } from './dto/get.user.dto';
import { AuthService } from './auth/auth.service';
import process from 'process';
import dotenv from 'dotenv';
import { DigitalOceanService } from '../../digtal.ocean/digital.ocean.service';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private digitalOceanService: DigitalOceanService,
  ) {}

  async getById(id: string) {
    const user = await this.userRepository.findOne<User>({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne<User>({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else return user;
  }

  async getUserById(token: string, dto: GetUserDto) {
    await this.authService.verifyToken(token);
    const user = await this.getById(dto.id);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      email_confirmed: user.email_confirmed,
      bio: user.bio,
      subscribers_count: user.subscribers_count,
      subscriptions_count: user.subscriptions_count,
      favorites_count: user.favorites_count,
      reposts_count: user.reposts_count,
      tracks_count: user.tracks_count,
      albums_count: user.albums_count,
      playlists_count: user.playlists_count,
    };
  }

  async changeProfilePicture(token: string, picture: any) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.getById(jwtPayload.user_id);

    const previousUrl = user.picture_url;

    if (
      user.picture_url.split(
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_PROFILE_PATH,
      )[1] !== 'default'
    ) {
      await this.digitalOceanService.removeFile(
        user.id,
        process.env.DIGITAL_OCEAN_BUCKET_PICTURE_PROFILE_PATH,
      );
    }

    user.picture_url = await this.digitalOceanService.uploadFile(
      picture.buffer,
      user.id,
      process.env.DIGITAL_OCEAN_BUCKET_PICTURE_PROFILE_PATH,
    );

    await user.save();
    return {
      url: user.picture_url,
      previous_url: previousUrl,
      id: user.id,
    };
  }
}
