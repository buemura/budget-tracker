import { Injectable } from '@nestjs/common';

import { LoginAuthDto } from '@domain/user/dtos/auth.dto';
import { UnauthorizedError } from '@domain/user/errors/unauthorized.error';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { Logger } from '@helpers/logger';
import { ResponseDto } from '@shared/dtos/response.dto';
import { MissingParametersError } from '@shared/errors/missing-parameters.error';
import { AccessTokenProvider } from '../../../providers/access-token-provider';
import { PasswordHashProvider } from '../../../providers/password-hash-provider';

@Injectable()
export class LoginUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: LoginAuthDto): Promise<ResponseDto> {
    if (!email || !password) {
      this.logger.info(`[LoginUserUsecase]: Missing required parameters`);
      throw new MissingParametersError('email', 'password');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.info(
        `[LoginUserUsecase]: Invalid credentials (User not found)`,
      );
      throw new UnauthorizedError('Invalid credentials');
    }

    const match = PasswordHashProvider.compare(password, user.password ?? '');
    if (!match) {
      this.logger.info(`[LoginUserUsecase]: Invalid credentials`);
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = { id: user.id };
    const accessToken = AccessTokenProvider.generate(payload, '7d');
    const { password: userPass, ...userToReturn } = user;

    this.logger.info(`[LoginUserUsecase]: Successfully authenticated`);

    return {
      data: {
        message: 'Successfully authenticated',
        accessToken,
        user: userToReturn,
      },
    };
  }
}
