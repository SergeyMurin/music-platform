import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserSignUpRequestDto } from './dto/user.sign.up.request.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfirmAccountDto } from './dto/confirm.account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  @Post('auth/google')
  async googleAuth(@Body('token') token): Promise<UserSignInResponseDto> {
    return await this.userService.googleSignIn(token);
  }

  @Post('sign-up')
  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: UserSignUpRequestDto): Promise<UserSignInResponseDto> {
    return this.userService.signUp(dto);
  }

  @Post('sign-in')
  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  signIn(@Body() dto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.userService.signIn(dto);
  }

  @Get('confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDto,
  ): Promise<boolean> {
    await this.userService.confirm(query.token);
    return true;
  }

  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async test(): Promise<any> {
    return 'auth test success!';
  }
}
