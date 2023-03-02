import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
