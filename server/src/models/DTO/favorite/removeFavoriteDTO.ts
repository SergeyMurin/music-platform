import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveFavoriteDTO {
  @ApiProperty()
  @IsString()
  favorite_id: string;
}
