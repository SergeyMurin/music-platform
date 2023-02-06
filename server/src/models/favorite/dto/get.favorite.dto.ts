import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetFavoriteDto {
  @ApiProperty()
  @IsString()
  favorite_id: string;
}