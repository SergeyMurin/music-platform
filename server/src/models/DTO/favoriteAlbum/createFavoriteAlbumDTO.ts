import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavoriteAlbumDTO {
  @ApiProperty()
  @IsUUID(4)
  album_id: string;
}
