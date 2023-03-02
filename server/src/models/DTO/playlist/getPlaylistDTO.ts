import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetPlaylistDTO {
  @ApiProperty()
  @IsUUID(4)
  readonly id: string;
}
