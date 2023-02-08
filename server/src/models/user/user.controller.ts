import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //editUser
  //search
  //changeAvatar
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getUserById(@Req() request, @Query() dto: GetUserDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.userService.getUserById(token, dto);
  }
}
