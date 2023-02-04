import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { UserService } from '../../user.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt.payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwtPrivateKey',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.userService.getByEmail(payload.email);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, user, payload.iat);
  }
}
