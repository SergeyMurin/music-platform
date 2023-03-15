import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavoriteTrackDto {
  @ApiProperty()
  @IsUUID(4)
  track_id: string;
}
