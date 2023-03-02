import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '../entities/userRoleEntity';
import { Role } from '../entities/roleEntity';
import { RoleService } from './roleService';
import { UserService } from './userService';
import { JwtPayload } from '../../shared/jwt/jwtPayloadModel';
import { JwtService } from '@nestjs/jwt';
import { UserTokenService } from './userTokenService';
import { RoleTitleEnum } from '../../shared/enum/roleTitleEnum';
import { ConfigService } from '../../shared/config/configService';
import { SwitchRoleDTO } from '../DTO/userRole/switchRoleDTO';
import { RoleDTO } from '../DTO/userRole/roleDTO';

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

  async getRoleByUserId(user_id: string): Promise<RoleDTO> {
    const userRole = await this.userRoleRepository.findOne({
      where: { id: user_id },
    });
    const role = await this.roleService.getById(userRole.role_id);
    if (!role) {
      throw new NotFoundException(
        `Role not found for user with id: ${user_id}`,
      );
    }
    return {
      id: role.id,
      title: role.title,
      access: role.access,
    };
  }

  async isUserAdmin(user_id: string): Promise<boolean> {
    const adminRole = await this.roleService.getByTitle(RoleTitleEnum.ADMIN);
    const userRole = await this.userRoleRepository.findOne({
      where: { id: user_id, role_id: adminRole.id },
    });
    return !!userRole;
  }

  async getRoleIdByTitle(roleTitle: RoleTitleEnum): Promise<string> {
    const role = await this.roleRepository.findOne({
      where: { title: roleTitle },
    });
    if (!role) {
      throw new NotFoundException(`Role with title ${roleTitle} not found`);
    }
    return role.id;
  }

  async getUserIdsByRole(
    token: string,
    roleTitle: RoleTitleEnum,
  ): Promise<string[]> {
    const jwtPayload = await this.verifyTokenForAdmin(token);
    if (!(await this.isUserAdmin(jwtPayload.user_id))) {
      throw new ForbiddenException('Not authorized to access this resource');
    }
    const roleId = await this.getRoleIdByTitle(roleTitle);
    const users = await this.userRoleRepository.findAll({
      where: { role_id: roleId },
    });
    return users.map((user) => user.id);
  }

  async create(user_id: string, role_title: string): Promise<UserRole> {
    const role = await this.roleService.getByTitle(role_title);
    return await this.userRoleRepository.create({
      id: user_id,
      role_id: role.id,
    });
  }

  async switchRole(
    token: string,
    dto: SwitchRoleDTO,
    roleTitle: RoleTitleEnum,
  ) {
    await this.validateAdmin(token, dto);

    const userRole = await this.userRoleRepository.findOne({
      where: { id: dto.user_id },
    });
    const role = await this.roleRepository.findOne({
      where: { title: roleTitle },
    });

    userRole.role_id = role.id;
    await userRole.save();
    return { user_id: userRole.id, role_id: userRole.role_id };
  }

  async validateAdmin(token, dto) {
    const jwtPayload = await this.verifyTokenForAdmin(token);
    if (!(await this.isUserAdmin(jwtPayload.user_id))) {
      throw new HttpException('Not admin', HttpStatus.BAD_REQUEST);
    }
    if (jwtPayload.user_id === dto.user_id) {
      throw new HttpException(
        "Can't reassign own role",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyTokenForAdmin(token: string): Promise<JwtPayload> {
    const data = this.jwtService.verify(token, {
      secret: this.jwtPrivateKey,
    });
    const tokenExists = await this.tokenService.exists(data.user_id, token);
    if (!tokenExists) {
      throw new HttpException(
        'Token verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
    return data as JwtPayload;
  }
}
