export class CreateUserDto {
  readonly username: string;
  readonly email_confirmed: string;

  readonly password: string;

  readonly user_picture_url: string | null;

  readonly bio: string | null;
}
