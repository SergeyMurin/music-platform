import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpRequestDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsString()
  readonly password: string;
}
