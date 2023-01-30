import { Inject, Injectable } from '@nestjs/common';

import { Repost } from './repost.entity';

@Injectable()
export class RepostService {
  constructor(
    @Inject('REPOST_REPOSITORY')
    private repostRepository: typeof Repost,
  ) {}
}
