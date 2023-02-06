import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFavoriteTrackDto {
  @ApiProperty()
  @IsString()
  track_id: string;
}
