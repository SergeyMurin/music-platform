import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //getUser
  //editUser
  //search
  //changeAvatar
  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async test(@Req() req): Promise<any> {
    return 'auth test success!';
  }
}
