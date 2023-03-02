import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveCommentsDTO {
  @ApiProperty()
  @IsString()
  readonly comment_id: string;
}
