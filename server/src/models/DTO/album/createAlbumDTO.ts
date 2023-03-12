import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsString } from 'class-validator';
import { CreateAlbumTrackDTO } from './createAlbumTrackDTO';

export class CreateAlbumDTO {
  @ApiProperty()
  @IsString()
  readonly title: string;
  @ApiProperty()
  @IsString()
  readonly tags: string;

  @ApiProperty()
  @IsString()
  readonly genres: string;

  @ApiProperty()
  @IsString()
  tracks: CreateAlbumTrackDTO[] | string;
}
