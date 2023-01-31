export class UserSignUpDto {
  readonly username: string;

  readonly email: string;
  readonly email_confirmed: boolean;

  readonly password: string;

  readonly user_picture_url: string | null;

  readonly bio: string | null;
}
