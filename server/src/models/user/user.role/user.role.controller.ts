import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { UserRoleService } from './user.role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  create(@Query() query, @Req() request, @Res() response) {
    this.userRoleService.initRole(query, request, response);
  }
}
