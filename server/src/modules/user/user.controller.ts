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
import { GetUserDto } from '../../common/dto/user/get-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EditUserDto } from '../../common/dto/user/edit-user.dto';
import { SearchDto, searchType } from '../../common/dto/user/search.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //search
  @Get()
  @UsePipes(new ValidationPipe())
  async getUserById(@Req() request, @Query() dto: GetUserDto) {
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
  async edit(@Req() request, @Body() dto: EditUserDto) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.userService.edit(token, dto);
  }

  @Get('/search')
  async search(@Req() request, @Query() dto: SearchDto) {
    return await this.userService.search(dto);
  }

  @Get('/search/config')
  async searchConfig() {
    return {
      type: searchType,
    };
  }
}
