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
import { AuthService } from '../services/authService';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserSignInResponseDTO } from '../DTO/auth/userSignInResponseDTO';
import { UserSignUpRequestDTO } from '../DTO/auth/userSignUpRequestDTO';
import { UserSignInRequestDTO } from '../DTO/auth/userSignInRequestDTO';
import { ConfirmAccountDTO } from '../DTO/auth/confirmAccountDTO';
import { ForgotPasswordDTO } from '../DTO/auth/forgotPasswordDTO';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDTO } from '../DTO/auth/resetPasswordDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: UserSignInResponseDTO })
  @UsePipes(new ValidationPipe())
  @Post('google')
  async googleAuth(@Body('token') token): Promise<UserSignInResponseDTO> {
    return await this.authService.googleSignIn(token);
  }

  @Post('sign-up')
  @ApiOkResponse({ type: UserSignInResponseDTO })
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: UserSignUpRequestDTO): Promise<UserSignInResponseDTO> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiOkResponse({ type: UserSignInResponseDTO })
  @UsePipes(new ValidationPipe())
  signIn(@Body() dto: UserSignInRequestDTO): Promise<UserSignInResponseDTO> {
    return this.authService.signIn(dto);
  }

  @Get('confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDTO,
  ): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDTO,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch('reset-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDTO,
    @Req() request,
  ): Promise<boolean> {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
