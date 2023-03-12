import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class EditAlbumDTO {
  @ApiProperty()
  @IsUUID(4)
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly tags: string;

  @ApiProperty()
  @IsString()
  readonly genres: string;
}
