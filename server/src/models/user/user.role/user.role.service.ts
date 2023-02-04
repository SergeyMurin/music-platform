import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRole } from './user.role.entity';
import { Role } from '../../role/role.entity';
import { RoleService } from '../../role/role.service';
import { UserService } from '../user.service';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: typeof UserRole,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof Role,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  async initRole(query, req, res) {
    try {
      const roleId = query.role_id;
      const userId = query.user_id;
      const user = await this.userRepository.findByPk(userId);
      const role = await this.roleRepository.findByPk(roleId);
      const userRole = await this.userRoleRepository.findByPk(userId);

      if (userRole) {
        userRole.role_id = roleId;
        await userRole.save();
      } else {
        await this.userRoleRepository.create({
          id: userId,
          role_id: roleId,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async create(user_id: string, role_title: string) {
    const role = await this.roleService.findByTitle(role_title);
    return await this.userRoleRepository.create({
      id: user_id,
      role_id: role.id,
    });
  }
}
