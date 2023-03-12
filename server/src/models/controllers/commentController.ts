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
import { CommentService } from '../services/commentService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from '../DTO/comment/createCommentDTO';
import { RemoveCommentsDTO } from '../DTO/comment/removeCommentsDTO';

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
  async create(@Req() request, @Body() dto: CreateCommentDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.commentService.create(token, dto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Req() request, @Body() dto: RemoveCommentsDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.commentService.remove(token, dto);
  }
}
