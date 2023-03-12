import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlayTrackDTO {
  @ApiProperty()
  @IsString()
  readonly track_id: string;
}
