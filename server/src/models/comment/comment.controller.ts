import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create.comment.dto';
import { AuthService } from '../user/auth/auth.service';
import { RemoveTrackDto } from '../track/dto/remove.track.dto';
import { RemoveCommentDto } from './dto/remove.comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAll(
    @Req()
    request: Request,
    @Res()
    response,
  ) {
    return null;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Req() request, @Body() dto: CreateCommentDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.commentService.create(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request, @Body() dto: RemoveCommentDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.commentService.remove(token, dto);
  }
}
