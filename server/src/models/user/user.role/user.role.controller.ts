import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRoleService } from './user.role.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SwitchRoleDto } from './dto/switch.role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get('/admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllAdmins(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.getAllAdmins(token);
  }

  @Get('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(@Req() request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.getAllUsers(token);
  }

  @Post('/admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async switchToAdmin(@Req() request: Request, @Body() dto: SwitchRoleDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.switchToAdmin(token, dto);
  }

  @Post('/user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async switchToUser(@Req() request: Request, @Body() dto: SwitchRoleDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userRoleService.switchToUser(token, dto);
  }
}
