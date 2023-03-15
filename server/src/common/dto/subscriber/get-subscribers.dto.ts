import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetSubscribersDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
