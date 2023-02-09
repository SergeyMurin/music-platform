import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get.user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditUserDto } from './dto/edit.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //search
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async getUserById(@Req() request, @Query() dto: GetUserDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userService.getUserById(token, dto);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  async changeProfilePicture(@UploadedFiles() files, @Req() request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userService.changeProfilePicture(token, files.picture[0]);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async edit(@Req() request, @Body() dto: EditUserDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userService.edit(token, dto);
  }
}
