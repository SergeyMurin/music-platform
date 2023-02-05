import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRole } from './user.role.entity';
import { Role } from '../../role/role.entity';
import { RoleService } from '../../role/role.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/jwt/jwt.payload.model';
import { JwtService } from '@nestjs/jwt';
import { UserTokenService } from '../user.token/user.token.service';
import { RoleTitleEnum } from '../../../shared/enum/role.title.enum';
import { ConfigService } from '../../../shared/config/config.service';
import { SwitchRoleDto } from './dto/switch.role.dto';

@Injectable()
export class UserRoleService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: typeof UserRole,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: typeof Role,
    private readonly configService: ConfigService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: UserTokenService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async userIsAdmin(user_id: string) {
    const adminRole = await this.roleRepository.findOne({
      where: {
        title: RoleTitleEnum.ADMIN,
      },
    });
    return await this.userRoleRepository.findOne({
      where: { id: user_id, role_id: adminRole.id },
    });
  }

  async getAllUsers(token) {
    const jwtPayload = await this.verifyTokenForAdmin(token);
    if (!(await this.userIsAdmin(jwtPayload.user_id))) {
      throw new HttpException('Not admin', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleRepository.findOne({
      where: { title: RoleTitleEnum.USER },
    });

    const users = await this.userRoleRepository.findAll({
      where: { role_id: role.id },
    });

    return users.map((user) => {
      return user.id;
    });
  }

  async getAllAdmins(token) {
    const jwtPayload = await this.verifyTokenForAdmin(token);
    if (!(await this.userIsAdmin(jwtPayload.user_id))) {
      throw new HttpException('Not admin', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleRepository.findOne({
      where: { title: RoleTitleEnum.ADMIN },
    });

    const admins = await this.userRoleRepository.findAll({
      where: { role_id: role.id },
    });

    return admins.map((admin) => {
      return admin.id;
    });
  }

  /* async initRole(query, req, res) {
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
                                                      }*/

  async create(user_id: string, role_title: string) {
    const role = await this.roleService.findByTitle(role_title);
    return await this.userRoleRepository.create({
      id: user_id,
      role_id: role.id,
    });
  }

  async switchToAdmin(token: string, dto: SwitchRoleDto) {
    await this.validateAdmin(token, dto);

    const userRole = await this.userRoleRepository.findOne({
      where: {
        id: dto.user_id,
      },
    });
    const role = await this.roleRepository.findOne({
      where: { title: RoleTitleEnum.ADMIN },
    });

    userRole.role_id = role.id;
    await userRole.save();
    return { user_id: userRole.id, role_id: userRole.role_id };
  }

  async validateAdmin(token, dto) {
    const jwtPayload = await this.verifyTokenForAdmin(token);
    if (!(await this.userIsAdmin(jwtPayload.user_id))) {
      throw new HttpException('Not admin', HttpStatus.BAD_REQUEST);
    }
    if (jwtPayload.user_id === dto.user_id) {
      throw new HttpException(
        "Can't reassign own role",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async switchToUser(token: string, dto: SwitchRoleDto) {
    await this.validateAdmin(token, dto);
    const userRole = await this.userRoleRepository.findOne({
      where: {
        id: dto.user_id,
      },
    });
    const role = await this.roleRepository.findOne({
      where: { title: RoleTitleEnum.USER },
    });

    userRole.role_id = role.id;
    await userRole.save();
    return { user_id: userRole.id, role_id: userRole.role_id };
  }

  async verifyTokenForAdmin(token: string): Promise<JwtPayload> {
    const data = this.jwtService.verify(token, {
      secret: this.jwtPrivateKey,
    }) as JwtPayload;
    const tokenExists = await this.tokenService.exists(data.user_id, token);
    if (tokenExists) {
      return data;
    }
    throw new HttpException("Token doesn't exist", HttpStatus.BAD_REQUEST);
  }
}
