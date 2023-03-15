import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveFavoritesDto {
  @ApiProperty()
  @IsString()
  favorite_id: string;
}
