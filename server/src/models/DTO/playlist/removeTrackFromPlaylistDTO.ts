import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemoveTrackFromPlaylistDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsUUID(4)
  track_id: string;
}
