import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserRepostsDTO {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
