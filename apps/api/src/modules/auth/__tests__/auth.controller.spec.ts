import { LoginUserUseCase } from '@core/auth/usecases/login-user.usecase';
import { RegisterUserUseCase } from '@core/auth/usecases/register-user.usecase';
import { ProvidersModule } from '@infra/providers/providers.module';
import { UsersModule } from '@modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';

describe.skip('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PassportModule, ProvidersModule],
      controllers: [AuthController],
      providers: [RegisterUserUseCase, LoginUserUseCase, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
