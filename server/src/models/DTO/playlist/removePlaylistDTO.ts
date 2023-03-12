import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemovePlaylistDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
