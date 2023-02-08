import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';

import { Comment } from './comment.entity';
import { AuthService } from '../user/auth/auth.service';
import { TrackService } from '../track/track.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { RemoveCommentDto } from './dto/remove.comment.dto';
import { UserRoleService } from '../user/user.role/user.role.service';
import { GetTrackCommentsDto } from './dto/get.track.comments.dto';
import { Track } from '../track/track.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: typeof Comment,
    @Inject('TRACK_REPOSITORY')
    private trackRepository: typeof Track,
    private readonly authService: AuthService,
    private readonly trackService: TrackService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async getTrackComments(id: string) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new BadRequestException();
    }
    const comments = await this.commentRepository.findAll({
      where: {
        track_id: id,
      },
    });
    return comments.map((comment) => {
      return {
        id: comment.id,
        user_id: comment.user_id,
        track_id: comment.track_id,
        content: comment.content,
      };
    });
  }

  async create(token: string, dto: CreateCommentDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const track = await this.trackService.getTrackById(dto.track_id);
    if (!track) {
      throw new BadRequestException();
    }

    await this.commentRepository.create({
      content: dto.content,
      user_id: jwtPayload.user_id,
      track_id: dto.track_id,
    });
    track.comments_count++;
    await track.save();
    throw new HttpException('Created', HttpStatus.CREATED);
  }

  async remove(token, dto: RemoveCommentDto) {
    const jwtPayload = await this.authService.verifyToken(token);
    const comment = await this.commentRepository.findByPk(dto.comment_id);
    const track = await this.trackService.getTrackById(comment.track_id);

    if (!comment || !track) {
      throw new BadRequestException();
    }

    if (
      (await this.isCommentAuthor(jwtPayload.user_id, comment.id)) ||
      (await this.userRoleService.isUserAdmin(jwtPayload.user_id))
    ) {
      track.comments_count--;
      await track.save();
      await comment.destroy();
    }
  }

  async isCommentAuthor(user_id, comment_id) {
    return await this.commentRepository.findOne({
      where: {
        id: comment_id,
        user_id,
      },
    });
  }

  async removeTrackComments(track_id: string) {
    const comments = await this.commentRepository.findAll({
      where: { track_id },
    });

    if (comments.length) {
      await Promise.all(
        comments.map(async (comment) => {
          await comment.destroy();
        }),
      );
    }
  }
}
