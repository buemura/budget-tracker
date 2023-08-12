import { TokenPayload } from '@api/auth/dtos/token-payload.dto';

export abstract class TokenService {
  abstract generate(tokenPayload: TokenPayload): string;
}
