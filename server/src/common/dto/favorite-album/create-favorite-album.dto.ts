import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavoriteAlbumDto {
  @ApiProperty()
  @IsUUID(4)
  album_id: string;
}
