import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsString()
  readonly user_id: string;
}