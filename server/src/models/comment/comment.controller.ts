import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create.comment.dto';
import { RemoveCommentDto } from './dto/remove.comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/track')
  async getTrackComments(@Query('id') id: string) {
    return await this.commentService.getTrackComments(id);
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
