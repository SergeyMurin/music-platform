import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
