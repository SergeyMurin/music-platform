import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof Role,
  ) {}

  async add(query, req, res) {
    try {
      const title = query.title;
      const access = query.access;
      await this.roleRepository.create({
        title: title,
        access: access,
      });
      return res.send();
    } catch (error) {
      console.error(error);
    }
  }
}
