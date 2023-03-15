import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetTrackDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
