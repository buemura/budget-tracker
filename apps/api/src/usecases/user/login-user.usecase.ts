import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
  PasswordHashService,
  TokenService,
} from '@domain/cryptography/contracts';
import { ITokenPayload } from '@domain/cryptography/interfaces/token.interface';
import { ERROR_MESSAGE } from '@domain/user/errors/messages';
import {
  ILoginResponse,
  ILoginUser,
} from '@domain/user/interfaces/user.interface';
import { GetUserByEmailUsecase } from '@usecases/user';

@Injectable()
export class LoginUserUsecase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordHashService: PasswordHashService,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
  ) {}

  private generateToken(sub: string): string {
    const tokenPayload: ITokenPayload = {
      sub,
    };

    return this.tokenService.generate(tokenPayload);
  }

  async execute(data: ILoginUser): Promise<ILoginResponse> {
    const user = await this.getUserByEmailUsecase.execute(data.email);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const isPasswordValid = this.passwordHashService.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    return {
      accessToken: this.generateToken(user.id),
      user,
    };
  }
}
