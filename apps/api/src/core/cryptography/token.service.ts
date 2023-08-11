import { TokenPayload } from '@modules/auth/dtos/token-payload.dto';

export abstract class TokenService {
  abstract generate(tokenPayload: TokenPayload): string;
}
