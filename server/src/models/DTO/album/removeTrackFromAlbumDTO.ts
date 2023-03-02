import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemoveTrackFromAlbumDTO {
  @ApiProperty()
  @IsUUID(4)
  readonly id: string;
}
