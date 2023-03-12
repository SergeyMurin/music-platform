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

import { UserService } from '../services/userService';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDTO } from '../DTO/user/getUserDTO';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditUserDTO } from '../DTO/user/editUserDTO';
import { SearchDTO, searchType } from '../DTO/user/searchDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //search
  @Get()
  @UsePipes(new ValidationPipe())
  async getUserById(@Req() request, @Query() dto: GetUserDTO) {
    return await this.userService.getUserById(dto);
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
  async edit(@Req() request, @Body() dto: EditUserDTO) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userService.edit(token, dto);
  }

  @Get('/search')
  async search(@Req() request, @Query() dto: SearchDTO) {
    return await this.userService.search(dto);
  }

  @Get('/search/config')
  async searchConfig() {
    return {
      type: searchType,
    };
  }
}
