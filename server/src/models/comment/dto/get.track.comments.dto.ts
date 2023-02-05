import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTrackCommentsDto {
  @ApiProperty()
  @IsString()
  readonly track_id: string;
}