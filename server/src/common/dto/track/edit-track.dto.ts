import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsString, IsUUID } from 'class-validator';

export class EditTrackDto {
  @ApiProperty()
  @IsUUID(4)
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsBooleanString()
  readonly explicit: string;

  @ApiProperty()
  @IsString()
  genres: string;

  @ApiProperty()
  @IsString()
  tags: string;

  @ApiProperty()
  @IsString()
  lyrics: string;
}
