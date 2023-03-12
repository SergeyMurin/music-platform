import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ChangePlaylistPictureDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
