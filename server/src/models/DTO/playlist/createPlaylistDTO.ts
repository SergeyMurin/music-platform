import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlaylistDTO {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
