import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditUserDTO {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly bio: string;
}
