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

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: typeof Comment,
    private readonly authService: AuthService,
    private readonly trackService: TrackService,
    private readonly userRoleService: UserRoleService,
  ) {}

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
}
