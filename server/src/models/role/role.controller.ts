import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { Request } from 'express';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAll(@Req() request: Request, @Res() response) {
    return null;
  }

  @Post()
  addAdmin(@Query() query, @Req() request: Request, @Res() response: Response) {
    return this.roleService.add(query, request, response);
  }
}
