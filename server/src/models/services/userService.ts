import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from '../entities/userEntity';
import { GetUserDTO } from '../DTO/user/getUserDTO';
import { AuthService } from './authService';
import process from 'process';
import dotenv from 'dotenv';
import { DigitalOceanService } from '../../shared/digitalOcean/digitalOceanService';
import { EditUserDTO } from '../DTO/user/editUserDTO';
import { SearchDTO, searchType } from '../DTO/user/searchDTO';
import { TrackService } from './trackService';
import { AlbumService } from './albumService';
import { Op } from 'sequelize';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly digitalOceanService: DigitalOceanService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
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

  async getByEmail(email: string, validate?) {
    const user = await this.userRepository.findOne<User>({
      where: { email },
    });
    if (!validate) {
      return user;
    }
    if (!user) {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else return user;
  }

  async getUserById(dto: GetUserDTO) {
    const user = await this.getById(dto.id);
    return {
      ...user.dataValues,
      picture_url: user.picture_url,
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

  async edit(token: string, dto: EditUserDTO) {
    const jwtPayload = await this.authService.verifyToken(token);
    const user = await this.getById(jwtPayload.user_id);
    user.bio = dto.bio;
    user.username = dto.username;
    await user.save();
    return {
      id: user.id,
      username: user.username,
      bio: user.bio,
    };
  }

  async search(dto: SearchDTO) {
    if (dto.type) {
      dto.type = dto.type.toUpperCase();
      await this.validateEnum(dto.type, searchType);
    }

    switch (dto.type) {
      case searchType.ALL: {
        const tracks = await this.trackService.searchByTerm(dto.term);
        const albums = await this.albumService.searchByTerm(dto.term);
        const users = await this.searchByTerm(dto.term);
        return {
          tracks: tracks ? tracks : [],
          albums: albums ? albums : [],
          users: users ? users : [],
        };
      }

      case searchType.TRACK: {
        const tracks = await this.trackService.searchByTerm(dto.term);
        return tracks ? tracks : [];
      }

      case searchType.ALBUM: {
        const albums = await this.albumService.searchByTerm(dto.term);
        return albums ? albums : [];
      }

      case searchType.USER: {
        const users = await this.searchByTerm(dto.term);
        return users ? users : [];
      }
    }
  }

  async searchByTerm(term: string) {
    const searchTitle = '%' + term.replace(' ', '%') + '%';
    const searchedUsers = await this.userRepository.findAll({
      where: {
        username: {
          [Op.iLike]: searchTitle,
        },
      },
      order: [['subscribers_count', 'DESC']],
    });

    return await Promise.all(
      searchedUsers.map(async (user) => {
        return {
          ...user.dataValues,
        };
      }),
    );
  }

  async validateEnum(value, enumObj) {
    for (const e in enumObj) {
      if (enumObj[e] === value) {
        return;
      }
    }
    throw new HttpException(
      `Value '${value}' is not valid`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
