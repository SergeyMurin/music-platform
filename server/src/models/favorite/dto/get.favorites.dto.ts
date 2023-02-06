import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetFavoritesDto {
  @ApiProperty()
  @IsString()
  user_id: string;
}
