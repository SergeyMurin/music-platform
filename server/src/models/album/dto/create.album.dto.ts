import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsString } from 'class-validator';
import { CreateAlbumTrackDto } from './create.album.track.dto';

export class CreateAlbumDto {
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
  tracks: CreateAlbumTrackDto[] | string;
}
