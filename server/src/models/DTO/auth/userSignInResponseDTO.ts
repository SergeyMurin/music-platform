import { UserDTO } from './userDTO';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entities/userEntity';

export class UserSignInResponseDTO extends UserDTO {
  @ApiProperty()
  token: string;

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
}
