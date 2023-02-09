import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty()
  @IsString()
  readonly term: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  sort: string;
}

export enum searchType {
  ALL = 'ALL',
  TRACK = 'TRACK',
  ALBUM = 'ALBUM',
  USER = 'USER',
}
