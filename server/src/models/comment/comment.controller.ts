import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }
}
