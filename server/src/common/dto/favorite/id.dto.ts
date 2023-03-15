import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
