import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRoleService } from '../services/userRoleService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SwitchRoleDTO } from '../DTO/userRole/switchRoleDTO';
import { RoleTitleEnum } from '../../shared/enum/roleTitleEnum';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  async getRoleByUserId(@Req() request: Request, @Query('id') id) {
    return await this.userRoleService.getRoleByUserId(id);
  }

  @Get('/admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllAdmins(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.getUserIdsByRole(
      token,
      RoleTitleEnum.ADMIN,
    );
  }

  @Get('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(@Req() request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.getUserIdsByRole(
      token,
      RoleTitleEnum.USER,
    );
  }

  @Post('/admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async switchToAdmin(@Req() request: Request, @Body() dto: SwitchRoleDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.switchRole(
      token,
      dto,
      RoleTitleEnum.ADMIN,
    );
  }

  @Post('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async switchToUser(@Req() request: Request, @Body() dto: SwitchRoleDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.switchRole(
      token,
      dto,
      RoleTitleEnum.USER,
    );
  }
}
