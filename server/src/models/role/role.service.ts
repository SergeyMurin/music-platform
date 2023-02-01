import { Inject, Injectable, Module } from '@nestjs/common';
import { Role } from './role.entity';
import initData from './init/default.json';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof Role,
    @Inject('SEQUELIZE')
    private sequelize,
  ) {
    sequelize.sync().then(() => this.init());
  }

  async init() {
    if (await this.roleRepository.findOne()) {
      return;
    }
    const roles = initData;
    for (const role of roles) {
      await this.roleRepository.create({
        title: role.title,
        access: role.access,
      });
    }
  }

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
