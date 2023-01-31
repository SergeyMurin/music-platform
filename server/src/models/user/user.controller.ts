import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserSignUpRequestDto } from './dto/user.sign.up.request.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*@Get('auth/google')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Req() req) {}
  
    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    @Redirect('http://localhost:3000')
    googleAuthRedirect(@Req() req) {
      return this.userService.googleSignIn(req);
    }*/

  @Post('sign-in')
  a() {}

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
}
