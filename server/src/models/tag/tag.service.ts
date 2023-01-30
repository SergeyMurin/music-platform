import { Inject, Injectable } from '@nestjs/common';

import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
  ) {}

  async create(query, req, res) {
    const title = query.title;
    const tag = await this.tagRepository.findOne({ where: { title: title } });
    if (tag) return;
    await this.tagRepository.create({
      title: title,
    });
  }
}
