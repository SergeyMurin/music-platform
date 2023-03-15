import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../modules/user/user.entity';

export class UserSignInResponseDto extends UserDto {
  @ApiProperty()
  token: string;

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
}
