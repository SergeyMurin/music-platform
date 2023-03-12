import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddTrackToPlaylistDTO {
  @ApiProperty()
  @IsString()
  readonly track_id;

  @ApiProperty()
  @IsString()
  readonly playlist_id;
}
