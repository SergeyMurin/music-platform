import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddTrackToPlaylistDto {
  @ApiProperty()
  @IsString()
  readonly track_id;

  @ApiProperty()
  @IsString()
  readonly playlist_id;
}
