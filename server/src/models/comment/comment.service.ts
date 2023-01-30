import { Inject, Injectable } from '@nestjs/common';

import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: typeof Comment,
  ) {}
}
