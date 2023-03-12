import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
