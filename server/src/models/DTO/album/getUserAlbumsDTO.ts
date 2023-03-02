import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserAlbumsDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsUUID(4)
  user_id: string;
}
