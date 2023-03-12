import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavoriteTrackDTO {
  @ApiProperty()
  @IsUUID(4)
  track_id: string;
}
