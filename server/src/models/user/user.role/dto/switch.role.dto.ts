import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SwitchRoleDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;
}