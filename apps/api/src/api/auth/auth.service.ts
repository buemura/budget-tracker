import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserUsecase } from '@application/user/create-user.usecase';
import { GetUserByEmailUsecase } from '@application/user/get-user-by-email.usecase';
import {
  PasswordHashService,
  TokenService,
} from '@domain/cryptography/contracts';
import { User } from '@domain/user/entities/user';
import { ERROR_MESSAGE } from '@domain/user/errors/messages';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { TokenPayload } from './dtos/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordHashService: PasswordHashService,
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly getUserByEmailUsecase: GetUserByEmailUsecase,
  ) {}

  private generateToken(sub: string): string {
    const tokenPayload: TokenPayload = {
      sub,
    };

    return this.tokenService.generate(tokenPayload);
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
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

  async register(data: RegisterRequestDto): Promise<User> {
    const user = await this.createUserUsecase.execute({
      ...data,
      password: this.passwordHashService.hash(data.password, 10),
    });

    return user;
  }
}
