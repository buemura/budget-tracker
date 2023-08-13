import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { GetUserByIdUsecase } from '@application/user/get-user-by-id.usecase';
import { ITokenPayload } from '@domain/cryptography/interfaces/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    configService: ConfigService,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: ITokenPayload): Promise<any> {
    const { sub } = payload;
    const session = await this.getUserByIdUsecase.execute(sub);

    if (!session) {
      this.logger.debug(`User | Model ${sub} not found`);
      throw new UnauthorizedException();
    }

    return session;
  }
}
