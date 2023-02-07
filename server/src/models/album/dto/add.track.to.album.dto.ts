import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { CreateAlbumTrackDto } from './create.album.track.dto';

export class AddTrackToAlbumDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

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

