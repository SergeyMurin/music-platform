import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveFavoriteDto {
  @ApiProperty()
  @IsString()
  favorite_id: string;
}
