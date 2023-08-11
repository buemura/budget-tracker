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

import { excludeKeysFromObject } from '@helpers/exclude';
import { UserResponseDto } from '@modules/user/dtos/user-response.dto';
import { User } from '@modules/user/entities/user';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { ConflictResponseDto } from '@shared/dtos/conflict-response.dto';
import { UnauthorizedResponseDto } from '@shared/dtos/unauthorized-response.dto';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login-request.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @ApiConflictResponse({ type: ConflictResponseDto })
  async register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  async getSessionInfo(@CurrentUser() session: User): Promise<UserResponseDto> {
    return excludeKeysFromObject<UserResponseDto>(session, ['password']);
  }
}
