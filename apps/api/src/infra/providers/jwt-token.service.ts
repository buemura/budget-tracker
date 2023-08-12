import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from '@domain/cryptography/contracts';
import { TokenPayload } from '@modules/auth/dtos/token-payload.dto';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(tokenPayload: TokenPayload): string {
    return this.jwtService.sign(tokenPayload);
  }
}
