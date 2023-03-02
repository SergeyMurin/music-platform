import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetPlaylistTracksDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
