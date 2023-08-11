import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@modules/user/user.service';

import { TokenPayload } from '../dtos/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: TokenPayload): Promise<any> {
    const { sub } = payload;
    const session = await this.userService.getById(sub);

    if (!session) {
      this.logger.debug(`User | Model ${sub} not found`);
      throw new UnauthorizedException();
    }

    return session;
  }
}
