import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SwitchRoleDTO {
  @ApiProperty()
  @IsString()
  readonly user_id: string;
}
