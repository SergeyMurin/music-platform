import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Req() request, @Res() response, @Body() dto: CreateUserDto) {
    return this.userService.create(request, response, dto);
  }
}
