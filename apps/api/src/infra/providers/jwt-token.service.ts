import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenService } from '@domain/cryptography/contracts';
import { ITokenPayload } from '@domain/cryptography/interfaces/token.interface';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(tokenPayload: ITokenPayload): string {
    return this.jwtService.sign(tokenPayload);
  }
}
