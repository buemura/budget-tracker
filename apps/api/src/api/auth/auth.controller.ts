import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserResponseDto } from '@api/user/dtos/user-response.dto';
import { User } from '@domain/user/entities/user';
import { CurrentUser } from '@helpers/decorators/current-user.decorator';
import { ConflictResponseDto } from '@helpers/dtos/conflict-response.dto';
import { UnauthorizedResponseDto } from '@helpers/dtos/unauthorized-response.dto';
import { excludeKeysFromObject } from '@helpers/exclude';
import { CreateUserUsecase, LoginUserUsecase } from '@usecases/user';
import { LoginRequestDto } from './dtos/login-request.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserUsecase: LoginUserUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @ApiConflictResponse({ type: ConflictResponseDto })
  async register(@Body() body: RegisterRequestDto) {
    return this.createUserUsecase.execute(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  async login(@Body() body: LoginRequestDto) {
    return this.loginUserUsecase.execute(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  async getSessionInfo(@CurrentUser() session: User): Promise<UserResponseDto> {
    return excludeKeysFromObject<UserResponseDto>(session, ['password']);
  }
}
