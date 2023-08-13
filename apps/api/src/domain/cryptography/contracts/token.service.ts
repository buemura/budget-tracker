import { ITokenPayload } from '../interfaces/token.interface';

export abstract class TokenService {
  abstract generate(tokenPayload: ITokenPayload): string;
}
