import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetTrackDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
