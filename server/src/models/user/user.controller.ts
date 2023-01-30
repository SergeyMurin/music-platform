import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Req() request, @Res() response) {
    return this.userService.create(request, response);
  }
}
