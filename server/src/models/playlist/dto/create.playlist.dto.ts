import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
