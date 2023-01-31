import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';

import { UserService } from './user.service';
import { UserSignUpDto } from './dto/user.sign.up.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @ApiOkResponse({ type: UserSignInResponseDto })
  signUp(@Body() dto: UserSignUpDto): Promise<UserSignInResponseDto> {
    return this.userService.signUp(dto);
  }

  //@nestjs/swagger bcrypt jsonwebtoken passport-jwt
  @Post()
  create(@Req() request, @Res() response, @Body() dto: UserSignUpDto) {
    //return this.userService.create(request, response, dto);
  }
}
