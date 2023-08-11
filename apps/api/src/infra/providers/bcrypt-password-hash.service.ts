import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

import { PasswordHashService } from '@core/cryptography';

@Injectable()
export class BcryptPasswordHashService implements PasswordHashService {
  compare(data: string | Buffer, encrypted: string): boolean {
    return compareSync(data, encrypted);
  }

  hash(data: string | Buffer, saltOrRounds: string | number): string {
    return hashSync(data, saltOrRounds);
  }
}
