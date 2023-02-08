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

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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
}
