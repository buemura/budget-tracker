import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PasswordHashService, TokenService } from '@core/cryptography';

import { User } from '../user/entities/user';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { TokenPayload } from './dtos/token-payload.dto';
import { ERROR_MESSAGE } from './errors/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordHashService: PasswordHashService,
    private readonly userService: UserService,
  ) {}

  private generateToken(sub: string): LoginResponseDto {
    const tokenPayload: TokenPayload = {
      sub,
    };

    const accessToken = this.tokenService.generate(tokenPayload);
    return {
      id: sub,
      accessToken,
    };
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.getByEmail(data.email);
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

    return this.generateToken(user.id);
  }

  async register(data: RegisterRequestDto): Promise<User> {
    const user = await this.userService.create({
      ...data,
      password: this.passwordHashService.hash(data.password, 10),
    });

    return user;
  }
}
