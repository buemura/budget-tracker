import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload } from '@api/auth/dtos/token-payload.dto';
import { TokenService } from '@domain/cryptography/contracts';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(tokenPayload: TokenPayload): string {
    return this.jwtService.sign(tokenPayload);
  }
}
