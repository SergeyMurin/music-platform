import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRole } from './user.role.entity';
import { Role } from '../../role/role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: typeof UserRole,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof Role,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
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
}
