import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsString, IsUUID } from 'class-validator';
import { CreateAlbumTrackDTO } from './createAlbumTrackDTO';

export class AddTrackToAlbumDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
  @ApiProperty()
  @IsString()
  readonly title: string;
  @ApiProperty()
  @IsBooleanString()
  readonly explicit: boolean;
  @ApiProperty()
  @IsString()
  readonly lyrics: string;
  @ApiProperty()
  @IsString()
  readonly tags: string;

  @ApiProperty()
  @IsString()
  readonly genres: string;
}
