import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsBooleanString, IsEmail, IsString } from 'class-validator';

export class CreateTrackDto {
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
