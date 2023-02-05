import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create.tag.dto';
import { isArray } from 'class-validator';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
  ) {}

  async getTagById(id): Promise<Tag> {
    return await this.tagRepository.findOne({ where: { id } });
  }

  async getTagByTitle(title): Promise<Tag> {
    return await this.tagRepository.findOne({ where: { title } });
  }

  async createTagByTitle(title): Promise<Tag> {
    const tag = await this.getTagByTitle(title);
    if (tag) {
      tag.amount++;
      await tag.save();
      return tag;
    }

    return await this.tagRepository.create({
      title,
    });
  }

  async createTag(dto: CreateTagDto | CreateTagDto[]): Promise<Tag> {
    if (isArray(dto)) {
      for (const tag of dto) {
        if (!(await this.getTagByTitle(tag.title))) {
          await this.tagRepository.create({ title: tag.title });
        }
      }
    } else {
      if (await this.getTagByTitle(dto.title)) {
        throw new BadRequestException('Already Exist');
      }
      return await this.tagRepository.create({ title: dto.title });
    }
  }

  async removeTag(dto: CreateTagDto | CreateTagDto[]): Promise<boolean> {
    if (isArray(dto)) {
      for (const tag of dto) {
        if (await this.getTagByTitle(tag.title)) {
          await this.tagRepository.destroy({ where: { title: tag.title } });
        }
      }
    } else {
      if (!(await this.getTagByTitle(dto.title))) {
        throw new BadRequestException('There is no such token');
      }
      await this.tagRepository.destroy({ where: { title: dto.title } });
      return true;
    }
  }
}
