import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
