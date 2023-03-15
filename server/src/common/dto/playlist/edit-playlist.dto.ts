import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class EditPlaylistDto {
  @ApiProperty()
  @IsUUID(4)
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly title: string;
}
