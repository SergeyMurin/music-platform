import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserSignInResponseDto } from './dto/user.sign.in.response.dto';
import { UserSignUpRequestDto } from './dto/user.sign.up.request.dto';
import { UserSignInRequestDto } from './dto/user.sign.in.request.dto';
import { ConfirmAccountDto } from './dto/confirm.account.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from './dto/reset.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  @Post('google')
  async googleAuth(@Body('token') token): Promise<UserSignInResponseDto> {
    return await this.authService.googleSignIn(token);
  }

  @Post('sign-up')
  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: UserSignUpRequestDto): Promise<UserSignInResponseDto> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiOkResponse({ type: UserSignInResponseDto })
  @UsePipes(new ValidationPipe())
  signIn(@Body() dto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.authService.signIn(dto);
  }

  @Get('confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDto,
  ): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch('reset-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto,
    @Req() request,
  ): Promise<boolean> {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
